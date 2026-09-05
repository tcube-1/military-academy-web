'use client';

import SignUpForm from '@/components/auth/SignUpForm';
import getSafeReturnTo from '@/lib/getSafeReturnTo';
import { useSearchParams } from 'next/navigation';

export default function SignupPage() {
  const searchParams = useSearchParams();
  const returnTo = getSafeReturnTo(searchParams.get('returnTo'));

  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm transition-all">
      {/* Modern Soft Popup Wrapper */}
      <div className="bg-card w-full max-w-md animate-[softPop_0.3s_ease-out_forwards] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <SignUpForm returnTo={returnTo} />
      </div>
    </main>
  );
}
