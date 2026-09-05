'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SignupFormValues, signupSchema } from './signup.schema';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FaceBookSvg, GoogleSvg, WhatsAppSvg } from '../socialsvg/SvgComponent';
import { useState } from 'react'; // useState import chesam

import { SubmitButton } from './SubmitButton';
import { createAuthClient } from 'better-auth/react';
import Link from 'next/link';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default function SignUpForm({ returnTo }: { returnTo: string }) {
  const router = useRouter();
  const [isLoading, setIsGoogleLoading] = useState(false); // Simple loading state

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
      isContestant: false,
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const { error } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (error) {
        throw new Error(error.message || 'Signup failed');
      }

      router.replace(returnTo);
      router.refresh();
    } catch (error: unknown) {
      console.error(error);
    }
  };
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL:
          process.env.NEXT_PUBLIC_APP_URL || 'https://api.sphereline.in',
      });
      console.log(process.env.NEXT_PUBLIC_APP_URL, 'app url');
    } catch (error) {
      console.error('Google login failed:', error);
      setIsGoogleLoading(false);
    }
  };
  const handleClose = () => {
    router.back();
  };

  return (
    <div className="bg-card border-border relative w-full max-w-md rounded-2xl border p-8 shadow-lg sm:p-10">
      <button
        className={cn(
          'absolute top-2 right-2',
          'bg-primary/60 flex items-center justify-center gap-2 rounded-2xl p-2 capitalize',
          'active:bg-primary/40',
        )}
        onClick={handleClose}
      >
        <X className={cn('size-4')} />
      </button>
      <div className="relative top-5 mb-8 flex flex-col items-center justify-center text-center">
        <h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          Create an Account
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Join the academy and start your journey.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-foreground text-sm font-medium">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register('name')}
            disabled={isSubmitting}
            className={`bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-2.5 text-sm transition-all duration-200 outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
              errors.name
                ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
                : 'border-input'
            }`}
          />
          {errors.name && (
            <p className="text-destructive mt-1 text-xs font-medium">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-foreground text-sm font-medium"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register('email')}
            disabled={isSubmitting}
            className={`bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-2.5 text-sm transition-all duration-200 outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
              errors.email
                ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
                : 'border-input'
            }`}
          />
          {errors.email && (
            <p className="text-destructive mt-1 text-xs font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-foreground text-sm font-medium"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            disabled={isSubmitting}
            className={`bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-2.5 text-sm transition-all duration-200 outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
              errors.password
                ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
                : 'border-input'
            }`}
          />
          {errors.password && (
            <p className="text-destructive mt-1 text-xs font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="confirmPassword"
            className="text-foreground text-sm font-medium"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            {...register('confirmPassword')}
            disabled={isSubmitting}
            className={`bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-2.5 text-sm transition-all duration-200 outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
              errors.confirmPassword
                ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
                : 'border-input'
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-destructive mt-1 text-xs font-medium">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Checkboxes Section */}
        <div className="flex flex-col justify-center space-y-3 py-1">
          <div className="flex items-start gap-2">
            <input
              id="terms"
              type="checkbox"
              {...register('terms')}
              disabled={isSubmitting}
              className="border-input text-primary focus:ring-muted bg-background mt-1 h-3 w-3 shrink-0 rounded focus:ring-1 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <div className="flex flex-col">
              <label
                htmlFor="terms"
                className="text-foreground text-xs font-medium"
              >
                I agree to the Terms and Conditions
              </label>
              {errors.terms && (
                <p className="text-destructive mt-0.5 text-xs font-medium">
                  {errors.terms.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <input
              id="isContestant"
              type="checkbox"
              {...register('isContestant')}
              disabled={isSubmitting}
              className="border-input text-primary focus:ring-muted bg-background mt-1 h-3 w-3 shrink-0 rounded focus:ring-1 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <div className="flex flex-col">
              <label
                htmlFor="isContestant"
                className="text-foreground text-xs font-medium"
              >
                Register as a Contestant
              </label>
              {errors.isContestant && (
                <p className="text-destructive mt-0.5 text-xs font-medium">
                  {errors.isContestant.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />

        <div className={cn('flex size-10 w-full items-center justify-evenly')}>
          <Link href={`contact`}>
            <WhatsAppSvg
              className={cn('bg-secondary-foreground size-10 rounded-2xl p-1')}
            />
          </Link>
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className={cn(
              'group/googleicon',
              isLoading && 'cursor-wait opacity-60',
            )}
          >
            {isLoading ? (
              <div className="bg-secondary-foreground flex size-10 items-center justify-center rounded-2xl p-1">
                <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
              </div>
            ) : (
              <GoogleSvg
                className={cn(
                  'bg-secondary-foreground size-10 rounded-2xl p-1',
                  'group-active/googleicon:bg-secondary-hover',
                )}
              />
            )}
          </button>
          <Link href={`contact`}>
            <FaceBookSvg
              className={cn(
                'bg-secondary-foreground text-primary size-10 rounded-2xl p-1',
              )}
            />
          </Link>
        </div>
      </form>
    </div>
  );
}
