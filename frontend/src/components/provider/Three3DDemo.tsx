import React from 'react';

// Main Container to render both examples
export default function ThreeDDifferenceDemo() {
  const cardClasses =
    'relative w-full h-full text-white rounded-xl p-6 shadow-2xl flex flex-col justify-between';
  const innerTextClasses = 'transition-transform duration-[3000ms]'; // Match 3s transition

  return (
    <div className="min-h-screen bg-zinc-900 p-10 text-white">
      <h1 className="mb-10 text-center text-4xl font-bold">
        transform-style: preserve-3d Demo
      </h1>

      <div className="grid gap-16 md:grid-cols-2">
        {/* WITHOUT preserve-3d */}
        <div className="flex flex-col items-center">
          <h2 className="mb-6 text-2xl font-bold text-red-400">
            ❌ WITHOUT preserve-3d
          </h2>

          <div className="perspective-normal">
            <div className="relative h-72 w-72 rounded-xl bg-zinc-700 transition-transform duration-1000 hover:[transform:rotateX(25deg)_rotateY(-35deg)]">
              {/* Back Plane */}
              <div className="absolute top-8 left-8 flex h-20 w-20 [transform:translateZ(0px)] items-center justify-center rounded bg-green-500 text-xl font-bold">
                Z0
              </div>

              {/* Middle */}
              <div className="absolute top-24 left-24 flex h-20 w-20 [transform:translateZ(80px)] items-center justify-center rounded bg-blue-500 text-xl font-bold">
                Z80
              </div>

              {/* Front */}
              <div className="absolute top-40 left-40 flex h-20 w-20 [transform:translateZ(160px)] items-center justify-center rounded bg-red-500 text-xl font-bold">
                Z160
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-gray-400">
            Hover cheyyi. Moodu boxes same plane lo untayi. translateZ() almost
            effect ivvadu.
          </p>
        </div>

        {/* WITH preserve-3d */}
        <div className="flex flex-col items-center">
          <h2 className="mb-6 text-2xl font-bold text-green-400">
            ✅ WITH preserve-3d
          </h2>

          <div className="[perspective:500px]">
            <div className="relative h-72 w-72 rounded-xl bg-zinc-700 transition-transform duration-1000 [transform-style:preserve-3d] hover:[transform:rotateX(25deg)_rotateY(-35deg)]">
              {/* Back */}
              <div className="absolute top-8 left-8 flex h-20 w-20 [transform:translateZ(0px)] items-center justify-center rounded bg-green-500 text-xl font-bold">
                Z0
              </div>

              {/* Middle */}
              <div className="absolute top-24 left-24 flex h-20 w-20 [transform:translateZ(80px)] items-center justify-center rounded bg-blue-500 text-xl font-bold">
                Z80
              </div>

              {/* Front */}
              <div className="absolute top-40 left-40 flex h-20 w-20 [transform:translateZ(160px)] items-center justify-center rounded bg-red-500 text-xl font-bold">
                Z160
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-gray-400">
            Hover cheyyi. Red box munduku, Blue middle lo, Green back lo clear
            ga kanipisthai.
          </p>
        </div>
      </div>
    </div>
  );
}
