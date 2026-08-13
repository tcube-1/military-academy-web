import React, { useCallback, useEffect, useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

// ============================================================================
// PUBLIC TYPES
// ============================================================================

export interface UseMarqueeEngineOptions {
  axis?: 'x' | 'y';
  /** Autoplay speed in px/frame (at a 60fps baseline). Default: 1. */
  speed?: number;
  /** Whether the track loops infinitely. Default: true. */
  loop?: boolean;
  /** Pause autoplay while the pointer hovers the viewport. Default: true. */
  pauseOnHover?: boolean;
  /** Allow mouse wheel / trackpad scrubbing. Default: false. */
  enableWheel?: boolean;
  /** Allow pointer drag scrubbing. Default: false. */
  enableDrag?: boolean;
  /** Duration (s) of programmatic next()/prev() steps. Default: 0.5. */
  stepDuration?: number;
  /** Delay (s) before autoplay resumes after an interaction. Default: 0.8. */
  resumeDelay?: number;
}
interface UseMarqueeEngineRefs {
  viewportRef: React.RefObject<HTMLDivElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export interface UseMarqueeEngineReturn {
  pause: () => void;
  resume: () => void;
  next: () => void;
  prev: () => void;
  handleWheel: (event: React.WheelEvent<HTMLElement> | WheelEvent) => void;
  measure: () => void;
}

const DEFAULT_OPTIONS: Required<UseMarqueeEngineOptions> = {
  axis: 'x',
  speed: 1,
  loop: true,
  pauseOnHover: true,
  enableWheel: false,
  enableDrag: false,
  stepDuration: 0.5,
  resumeDelay: 0.8,
};

/**
 * useMarqueeEngine
 * ----------------------------------------------------------------------------
 * A headless, UI-agnostic animation engine for building marquee-style
 * components (logo sliders, ribbons, news tickers, testimonial rails, etc).
 *
 * DESIGN PRINCIPLES
 * - Single Source of Truth: `currentPosition` is the *only* piece of animation
 *   state. Every input (autoplay, wheel, drag, next/prev) only ever mutates
 *   `currentPosition.current`. Nothing else is allowed to touch the DOM.
 * - `render()` is the *only* function allowed to write to the DOM, via a
 *   GSAP `quickSetter`. This guarantees there is never more than one place
 *   where layout/paint can be triggered, which is what keeps this butter
 *   smooth at 60-120fps.
 * - The infinite loop is driven by `gsap.ticker`, not a GSAP timeline. A
 *   timeline models a fixed duration; a marquee is unbounded, so we drive it
 *   frame-by-frame instead and use `wrap()` to fold position back into a
 *   seamless range.
 * - Everything else (React state, GSAP tweens for next/prev) stays
 *   completely separate from this per-frame loop.
 *
 * CONSUMER CONTRACT
 * The consuming component is responsible for rendering the track content
 * *twice* back to back inside `trackRef` when `loop` is true (a standard
 * seamless-marquee technique). `measure()` divides the track's scroll width
 * by two to determine the width of a single content pass, which becomes the
 * wrap boundary. When `loop` is false, render the content once.
 */
export function useMarqueeEngine(
  refs: UseMarqueeEngineRefs,
  options: UseMarqueeEngineOptions = {},
): UseMarqueeEngineReturn {
  // --------------------------------------------------------------------
  // >> Fast refresh
  // >> broswer sets to defults config after fast refresh so it helps make.
  // --------------------------------------------------------------------
  const config: Required<UseMarqueeEngineOptions> = {
    ...DEFAULT_OPTIONS,
    ...options,
  };
  // --------------------------------------------------------------------
  // DOM REFS
  // Exposed to the set consumer so it can attach them to its own markup.
  // --------------------------------------------------------------------
  const { viewportRef, trackRef, itemRefs } = refs;

  // --------------------------------------------------------------------
  // >> DOM set useRef
  // >> Exposed to the consumer so it can attach them to its own markup
  // --------------------------------------------------------------------
  // const itemRefCallbacksRef = useRef(
  //   new Map<number, (node: HTMLElement | null) => void>(),
  // );
  // const setViewportRef = useCallback((node: HTMLDivElement | null) => {
  //   viewportRef.current = node;
  // }, []);
  // const setTrackRef = useCallback((node: HTMLDivElement | null) => {
  //   trackRef.current = node;
  // }, []);

  // const setItemRefs = useCallback((index: number) => {
  //   let callback = itemRefCallbacksRef.current.get(index);
  //   if (!callback) {
  //     callback = (node: HTMLElement | null) => {
  //       itemRefs.current[index] = node;
  //     };
  //     itemRefCallbacksRef.current.set(index, callback);
  //   }
  //   return callback;
  // }, []);

  // --------------------------------------------------------------------
  // OPTIONS AS REFS
  // Options are mirrored into refs so the ticker callback (registered once)
  // always reads the latest values without needing to be re-subscribed.
  // --------------------------------------------------------------------
  const axisRef = useRef(config.axis);
  const speedRef = useRef(config.speed);
  const loopRef = useRef(config.loop);
  const pauseOnHoverRef = useRef(config.pauseOnHover);
  const enableWheelRef = useRef(config.enableWheel);
  const enableDragRef = useRef(config.enableDrag);
  const stepDurationRef = useRef(config.stepDuration);
  const resumeDelayRef = useRef(config.resumeDelay);

  useEffect(() => {
    axisRef.current = config.axis;
    speedRef.current = config.speed;
    loopRef.current = config.loop;
    pauseOnHoverRef.current = config.pauseOnHover;
    enableWheelRef.current = config.enableWheel;
    enableDragRef.current = config.enableDrag;
    stepDurationRef.current = config.stepDuration;
    resumeDelayRef.current = config.resumeDelay;
  });

  // --------------------------------------------------------------------
  // ANIMATION STATE (SSOT)
  // `currentPosition` is the ONLY variable that represents "where the track is".
  // Every interaction source mutates this and nothing else.
  // --------------------------------------------------------------------
  const currentPosition = useRef(0);

  // --------------------------------------------------------------------
  // MEASUREMENT STATE
  // Populated by measure(), consumed by wrap()/update().
  // --------------------------------------------------------------------
  const contentSizeRef = useRef(0); // width of a single content pass
  const viewportSizeRef = useRef(0);

  // --------------------------------------------------------------------
  // RENDER PLUMBING
  // quickSetter is GSAP's fastest DOM-write primitive: it bypasses the
  // tween engine entirely and writes a transform directly, which is why it
  // is the only thing render() is allowed to call.
  // --------------------------------------------------------------------
  const quickSetterRef = useRef<((value: number) => void) | null>(null);

  // --------------------------------------------------------------------
  // INTERACTION / LIFECYCLE STATE
  // --------------------------------------------------------------------
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartPointerXRef = useRef(0);
  const dragStartCurrentXRef = useRef(0);
  const resumeTweenRef = useRef<gsap.core.Tween | null>(null);
  const stepTweenRef = useRef<gsap.core.Tween | null>(null);

  // --------------------------------------------------------------------
  // >> MEASURE
  // >> comment here
  // --------------------------------------------------------------------

  // ========================================================================
  // wrap()
  // Why: this is the single, reusable rule for "what happens when position
  // goes out of range". Every movement source (autoplay, wheel, drag,
  // next/prev) funnels its result through this function so looping behavior
  // never has to be reimplemented or duplicated.
  // ========================================================================
  const wrap = useCallback((value: number): number => {
    const contentSize = contentSizeRef.current;
    if (contentSize <= 0) return value;

    if (loopRef.current) {
      // Fold value into (-contentSize, 0] so the duplicated content pass
      // always lines up seamlessly at the wrap point.
      let wrapped = value % contentSize;
      if (wrapped > 0) wrapped -= contentSize;
      return wrapped;
    }

    // Non-looping mode: clamp within the scrollable range instead of
    // wrapping, so the track stops at its natural start/end.
    const minPosition = Math.min(0, -(contentSize - viewportSizeRef.current));
    return Math.max(minPosition, Math.min(0, value));
  }, []);

  // ========================================================================
  // render()
  // Why: the ONLY function permitted to write to the DOM. Centralizing the
  // write here means there is exactly one call site to optimize, profile,
  // or swap (e.g. for x/y, or a different property) and guarantees
  // `currentPosition` and the visible position can never drift apart.
  // ========================================================================
  const render = useCallback(() => {
    quickSetterRef.current?.(currentPosition.current);
  }, []);

  // ========================================================================
  // measure()
  // Why: layout-dependent values (content width, viewport width) must be
  // recomputed whenever the DOM changes (mount, resize, font load, content
  // swap). This is the single place that reads layout so nothing else has
  // to, and it is deliberately defined after wrap()/render() since it now
  // calls both.
  // ========================================================================
  const measure = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;

    if (!track || !viewport) return;

    const contentSize =
      axisRef.current === 'x' ? track.scrollWidth : track.scrollHeight;

    const viewportSize =
      axisRef.current === 'x' ? viewport.clientWidth : viewport.clientHeight;

    contentSizeRef.current = loopRef.current ? contentSize / 2 : contentSize;
    viewportSizeRef.current = viewportSize;

    // Re-normalize the existing position against the freshly-measured
    // dimensions immediately. A resize, font swap, or content change can
    // shrink or grow contentSize; without this fix, `currentPosition` keeps
    // referencing the *old* geometry until the next autoplay tick happens
    // to call wrap() again — visible as a jump, or (while paused) it never
    // self-corrects at all. render() remains the only DOM writer; measure()
    // just asks it to flush the corrected value.
    currentPosition.current = wrap(currentPosition.current);
    render();
  }, [wrap, render, viewportRef, trackRef]);

  // ========================================================================
  // scheduleMeasure()
  // Why: ResizeObserver (viewport + track) and a MutationObserver (dynamic
  // content) can each fire multiple times for what is really one visual
  // change — e.g. a browser window drag reports many rapid resize entries,
  // or a resize of the track cascades into a resize of the viewport in the
  // same frame. Calling measure() (which ends in a render()) once per event
  // is wasted work and, per the "no setInterval/no rAF" rule, this coalesces
  // them using the same gsap.ticker the rest of the engine already runs on
  // — a self-removing one-shot listener — rather than adding a second
  // timing primitive to the codebase.
  // ========================================================================
  const measureScheduledRef = useRef(false);
  const scheduleMeasure = useCallback(() => {
    if (measureScheduledRef.current) return;
    measureScheduledRef.current = true;

    const runOnce = () => {
      measureScheduledRef.current = false;
      gsap.ticker.remove(runOnce);
      measure();
    };
    gsap.ticker.add(runOnce);
  }, [measure]);

  // ========================================================================
  // update()
  // Why: encapsulates "how does currentPosition change on its own, every frame".
  // Kept separate from render() so the numeric/physics logic can be reasoned
  // about (and unit-tested) independently of DOM concerns.
  // ========================================================================
  const update = useCallback(() => {
    if (isPausedRef.current || isDraggingRef.current) return;

    // deltaRatio(60) normalizes movement to a 60fps baseline regardless of
    // the display's actual refresh rate, so `speed` means the same thing
    // on a 60Hz and a 144Hz screen.
    const distance = speedRef.current * gsap.ticker.deltaRatio(60);
    currentPosition.current = wrap(currentPosition.current - distance);

    // In non-looping mode, autoplay naturally stops once a boundary is hit
    // (wrap() clamps rather than folds), so pause to stop churning ticker.
    if (!loopRef.current) {
      const minPosition = Math.min(
        0,
        -(contentSizeRef.current - viewportSizeRef.current),
      );
      if (
        currentPosition.current === 0 ||
        currentPosition.current === minPosition
      ) {
        isPausedRef.current = true;
      }
    }
  }, [wrap]);

  // ========================================================================
  // animate()
  // Why: the single ticker-driven frame loop. This is intentionally the
  // *only* place `update()` and `render()` are called together, and it is
  // intentionally not a GSAP timeline — a marquee has no fixed duration, so
  // it is modeled as a per-frame side effect instead.
  // ========================================================================
  const animate = useCallback(() => {
    update();
    render();
  }, [update, render]);

  // ========================================================================
  // scheduleResume()
  // Why: interactions (wheel/drag/step) should temporarily suspend autoplay
  // and hand control back after a quiet period. A single `gsap.delayedCall`
  // (rather than setTimeout) keeps this on the same clock as the rest of
  // the engine and lets it be killed/reset cleanly on re-interaction.
  // ========================================================================
  const scheduleResume = useCallback(() => {
    resumeTweenRef.current?.kill();
    resumeTweenRef.current = gsap.delayedCall(resumeDelayRef.current, () => {
      if (!isDraggingRef.current) {
        isPausedRef.current = false;
      }
    });
  }, []);

  // ========================================================================
  // pause() / resume()
  // Why: explicit, imperative controls for the consumer (e.g. hover, a
  // "pause" button). Cancels any pending auto-resume so a manual pause
  // cannot be silently overridden by a queued interaction resume.
  // ========================================================================
  const pause = useCallback(() => {
    resumeTweenRef.current?.kill();
    isPausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    resumeTweenRef.current?.kill();
    if (!isDraggingRef.current) {
      isPausedRef.current = false;
    }
  }, []);

  // ========================================================================
  // stepTo() -> next() / prev()
  // Why: a shared implementation for discrete, animated steps.
  //
  // Stale-index fix (Issue 1): there is deliberately no `activeIndexRef`.
  // Any manually-tracked "current index" ref goes stale the moment autoplay,
  // wheel, or drag move `currentPosition` without updating it — `currentPosition` is the
  // single source of truth, so anything else claiming to track position is
  // a second source of truth waiting to desync. Instead, `findNearestIndex`
  // derives "which item are we closest to" *from* `currentPosition` itself, fresh,
  // every time next()/prev() is called.
  //
  // Pixel-perfect targeting (Issue 6): rather than assuming every item
  // shares one width, this reads the *real* laid-out position of both the
  // current and target items via `offsetLeft` — correct for variable-width
  // items, and immune to drift since nothing is ever accumulated across
  // calls.
  //
  // Per the consumer contract (see file header), items [0, n) in
  // `itemRefs` are pass 1 of the content; when looping, [n, 2n) is the
  // duplicated pass 2. Navigation always targets the pass-1 element —
  // wrap()'s folding is what makes that seamless near the loop boundary.
  //
  // Shortest-path wrapping (feeds Issue 5): `rawTarget` is an *absolute*
  // track offset that can be arbitrarily large (e.g. targeting item 0 from
  // near the end of the content). Tweening directly to it would either
  // visibly race all the way around the loop, or push `currentPosition` outside
  // the only range that has rendered content (`(-contentSize, 0]`, since
  // just two passes exist), producing a blank gap. Instead both the current
  // and target positions are folded into that canonical range, and the
  // *shortest circular delta* between them is what actually gets tweened.
  //
  // A one-off `gsap.to` tween is used to animate a plain proxy object
  // (never the DOM) whose `onUpdate` writes into `currentPosition` and then calls
  // `render()` directly — necessary because `stepTo()` pauses autoplay, and
  // a paused ticker no longer moves `currentPosition` on its own (though it still
  // renders it; see animate()). `currentPosition` remains the single source of
  // truth throughout; `render()` remains the only function that ever
  // touches the DOM.
  // ========================================================================
  const getItemsPerPass = useCallback((): number => {
    const populatedItems = itemRefs.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );
    return loopRef.current
      ? Math.floor(populatedItems.length / 2)
      : populatedItems.length;
  }, [itemRefs]);

  /**
   * Finds which pass-1 item's offsetLeft is closest to `position`. This is
   * the derivation step that replaces manually-tracked index state: given
   * only `currentPosition` (the SSOT) and real layout, it always answers "which
   * item are we looking at right now", so it can never go stale.
   */

  const findNearestIndex = useCallback(
    (position: number, itemsPerPass: number): number => {
      let nearestIndex = 0;
      let smallestDistance = Infinity;
      for (let i = 0; i < itemsPerPass; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const elementPosition =
          axisRef.current === 'x' ? el.offsetLeft : el.offsetTop;
        const distance = Math.abs(elementPosition - position);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          nearestIndex = i;
        }
      }
      return nearestIndex;
    },
    [itemRefs],
  );

  const stepTo = useCallback(
    (direction: 1 | -1) => {
      const itemsPerPass = getItemsPerPass();
      if (itemsPerPass <= 0) return;

      const contentSize = contentSizeRef.current;
      const wrappedPosition = wrap(currentPosition.current);

      // currentPosition is a translateX (moves left/negative), while offsetLeft is
      // a position (grows right/positive) — negating converts between the
      // two, and folding into [0, contentSize) matches offsetLeft's range
      // for the pass-1 items findNearestIndex searches.
      const referencePosition =
        loopRef.current && contentSize > 0
          ? ((-wrappedPosition % contentSize) + contentSize) % contentSize
          : -wrappedPosition;

      const activeIndex = findNearestIndex(referencePosition, itemsPerPass);

      let nextIndex: number;
      if (loopRef.current) {
        nextIndex = (activeIndex + direction + itemsPerPass) % itemsPerPass;
      } else {
        nextIndex = Math.max(
          0,
          Math.min(itemsPerPass - 1, activeIndex + direction),
        );
        if (nextIndex === activeIndex) return; // already at the edge
      }

      const targetEl = itemRefs.current[nextIndex];
      if (!targetEl) return;

      // offsetLeft is measured against the track (its offsetParent), so
      // -offsetLeft is exactly the translateX that aligns this item's left
      // edge to the viewport's left edge — correct for any item width.
      const targetOffset =
        axisRef.current === 'x' ? targetEl.offsetLeft : targetEl.offsetTop;

      const rawTarget = -targetOffset;

      pause();
      stepTweenRef.current?.kill();

      const startPosition = currentPosition.current;
      let delta = wrap(rawTarget) - wrap(startPosition);

      if (loopRef.current && contentSize > 0) {
        // Fold into the shortest circular path: (-contentSize/2, contentSize/2].
        if (delta > contentSize / 2) delta -= contentSize;
        if (delta < -contentSize / 2) delta += contentSize;
      }

      const proxy = { x: 0 };
      stepTweenRef.current = gsap.to(proxy, {
        x: delta,
        duration: stepDurationRef.current,
        ease: 'power2.out',
        onUpdate: () => {
          // Re-wrap on every frame, not just at the end: intermediate
          // values of a circular-delta tween can momentarily sit just past
          // the (-contentSize, 0] boundary, and only two content passes
          // are ever rendered, so anything outside that range would show
          // blank track.
          currentPosition.current = wrap(startPosition + proxy.x);
          render();
        },
        onComplete: () => {
          scheduleResume();
        },
      });
    },
    [
      getItemsPerPass,
      findNearestIndex,
      pause,
      wrap,
      render,
      scheduleResume,
      itemRefs,
    ],
  );

  const next = useCallback(() => stepTo(1), [stepTo]);
  const prev = useCallback(() => stepTo(-1), [stepTo]);

  // ========================================================================
  // handleWheel()
  // Why: translates a wheel/trackpad gesture directly into a `currentPosition`
  // delta. Exposed so a consumer can wire it to `onWheel` explicitly, but
  // it is also attached automatically below when `enableWheel` is true.
  // ========================================================================
  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLElement> | WheelEvent) => {
      if (!enableWheelRef.current) return;
      event.preventDefault();

      const delta =
        axisRef.current === 'x'
          ? event.deltaY || event.deltaX
          : event.deltaY || event.deltaX;
      stepTweenRef.current?.kill();
      currentPosition.current = wrap(currentPosition.current - delta);
      // Paint this frame's scrub immediately rather than waiting for the
      // ticker's next tick (up to one dropped frame of visible lag,
      // especially noticeable on fast trackpad flicks). `render()` remains
      // the only DOM writer; this just calls it from one more place.
      render();

      pause();
      scheduleResume();
    },
    [wrap, render, pause, scheduleResume],
  );

  // ========================================================================
  // GSAP SETUP + TICKER REGISTRATION
  // Why useGSAP: ties GSAP's internal state to this component's lifecycle
  // and guarantees teardown on unmount, matching React's effect model more
  // safely than a bare useEffect for GSAP-owned resources.
  // ========================================================================
  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      // quickSetter must exist before measure() runs: measure() ends by
      // calling render() to flush a re-normalized currentPosition, and that's a
      // silent no-op if quickSetterRef isn't populated yet.
      quickSetterRef.current = gsap.quickSetter(
        track,
        axisRef.current,
        'px',
      ) as (value: number) => void;
      measure();

      gsap.ticker.add(animate);

      return () => {
        gsap.ticker.remove(animate);
        quickSetterRef.current = null;
      };
    },
    { scope: viewportRef, dependencies: [animate, measure] },
  );

  // ========================================================================
  // RESIZE OBSERVATION
  // Why: content and viewport dimensions can change independently of React
  // re-renders (fonts loading, images loading, window resize). Re-measuring
  // keeps `wrap()`'s boundaries accurate without the consumer having to
  // remember to call measure() manually. Routed through scheduleMeasure()
  // since observing both viewport and track means a single visual resize
  // commonly produces two entries in the same callback batch.
  // ========================================================================
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const observer = new ResizeObserver(() => {
      scheduleMeasure();
    });

    observer.observe(viewport);
    observer.observe(track);

    return () => {
      observer.disconnect();
    };
  }, [scheduleMeasure, trackRef, viewportRef]);

  // ========================================================================
  // DYNAMIC CONTENT RE-MEASURE
  // Why: ResizeObserver only reacts to *size* changes. If items are added,
  // removed, or replaced inside the track and that edit happens not to
  // change the track's overall box size (rare, but possible depending on
  // layout), ResizeObserver alone can miss it. A MutationObserver watching
  // the track's subtree catches every structural change directly, so a
  // consumer that mutates children imperatively (rather than through props)
  // still gets accurate measurements without remembering to call measure()
  // itself. Scoped to childList/subtree only — it deliberately does not
  // watch attributes, so render()'s own `style.transform` writes (via
  // quickSetter) never trigger it.
  // ========================================================================
  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof MutationObserver === 'undefined') return;

    const observer = new MutationObserver(() => {
      scheduleMeasure();
    });

    observer.observe(track, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [scheduleMeasure, trackRef]);

  // ========================================================================
  // FONT-LOAD RE-MEASURE
  // Why: a web font swap can reflow text width without the *observed*
  // element's own border-box changing size (e.g. a fixed-width viewport
  // with overflow hidden), which ResizeObserver alone won't always catch.
  // Re-measuring once fonts settle keeps contentSize accurate for the
  // common "marquee renders before the custom font is ready" case.
  // ========================================================================
  useEffect(() => {
    if (typeof document === 'undefined' || !('fonts' in document)) return;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (!cancelled) scheduleMeasure();
    });

    return () => {
      cancelled = true;
    };
  }, [scheduleMeasure]);

  // ========================================================================
  // HOVER-TO-PAUSE
  // Why: a common marquee UX affordance. Implemented as a plain DOM
  // listener (not React state) to avoid triggering re-renders for
  // something that only ever mutates refs.
  // ========================================================================
  useEffect(() => {
    if (!pauseOnHoverRef.current) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleEnter = () => {
      if (pauseOnHoverRef.current) pause();
    };
    const handleLeave = () => {
      if (pauseOnHoverRef.current) resume();
    };

    viewport.addEventListener('mouseenter', handleEnter);
    viewport.addEventListener('mouseleave', handleLeave);

    return () => {
      viewport.removeEventListener('mouseenter', handleEnter);
      viewport.removeEventListener('mouseleave', handleLeave);
    };
  }, [pause, resume, viewportRef]);

  // ========================================================================
  // WHEEL (auto-attach)
  // Why: `{ passive: false }` is required to call preventDefault() on
  // wheel, which React's synthetic onWheel cannot do reliably. Attaching
  // natively here lets the consumer opt in via `enableWheel` alone.
  // ========================================================================
  useEffect(() => {
    if (!enableWheelRef.current) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    const listener = (event: WheelEvent) => handleWheel(event);
    viewport.addEventListener('wheel', listener, { passive: false });

    return () => {
      viewport.removeEventListener('wheel', listener);
      if (!enableWheelRef.current) return;
    };
  }, [handleWheel, viewportRef]);

  // ========================================================================
  // DRAG (auto-attach, pointer events)
  // Why: pointer events unify mouse/touch/pen into one API. Drag directly
  // mutates `currentPosition` (never the DOM), so it composes with the ticker's
  // render() exactly like every other input source.
  // ========================================================================
  useEffect(() => {
    if (!enableDragRef.current) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!enableDragRef.current) return;
      const pointer = axisRef.current === 'x' ? event.clientX : event.clientY;
      isDraggingRef.current = true;
      dragStartPointerXRef.current = pointer;
      dragStartCurrentXRef.current = currentPosition.current;
      stepTweenRef.current?.kill();
      pause();
      // Best-effort: some browsers/input types (e.g. certain touch/pen
      // sequences) can reject capture. Drag still works via the plain
      // pointermove listener below either way, so this is not fatal.
      // Attach pointermove only while dragging.
      viewport.addEventListener('pointermove', handlePointerMove);
      try {
        viewport.setPointerCapture(event.pointerId);
      } catch {
        // no-op
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const pointer = axisRef.current === 'x' ? event.clientX : event.clientY;
      if (!isDraggingRef.current) return;
      const delta = pointer - dragStartPointerXRef.current;
      currentPosition.current = wrap(dragStartCurrentXRef.current + delta);
      // Drag must track the pointer 1:1 with no perceptible lag, so paint
      // synchronously on every pointermove rather than waiting for the
      // next ticker tick. render() is still the only DOM writer.
      render();
    };

    const endDrag = (event: PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      // releasePointerCapture() throws (DOMException) if this pointerId was
      // never captured or was already implicitly released — e.g. the
      // pointerdown's setPointerCapture failed above, or the browser
      // auto-released it before this handler ran. hasPointerCapture() is
      // the correct guard; the try/catch is a second layer in case a given
      // browser's hasPointerCapture itself disagrees with reality.
      viewport.removeEventListener('pointermove', handlePointerMove);
      if (viewport.hasPointerCapture?.(event.pointerId)) {
        try {
          viewport.releasePointerCapture(event.pointerId);
        } catch {
          // no-op: already released
        }
      }
      scheduleResume();
    };

    viewport.addEventListener('pointerdown', handlePointerDown);
    viewport.addEventListener('pointermove', handlePointerMove);
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);

    return () => {
      viewport.removeEventListener('pointerdown', handlePointerDown);
      viewport.removeEventListener('pointermove', handlePointerMove);
      viewport.removeEventListener('pointerup', endDrag);
      viewport.removeEventListener('pointercancel', endDrag);
    };
  }, [wrap, render, pause, scheduleResume, viewportRef]);

  // ========================================================================
  // PUBLIC API
  // ========================================================================
  return {
    pause,
    resume,
    next,
    prev,
    handleWheel,
    measure,
  };
}
