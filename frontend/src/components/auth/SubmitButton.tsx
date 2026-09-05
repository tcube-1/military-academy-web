import React from 'react';

interface SubmitButtonProps {
  isSubmitting: boolean;
  isLoading: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  isLoading,
}) => {
  // Rendu states lo edokati true unna action block cheyadaniki
  const isPending: boolean = isSubmitting || isLoading;

  // State batti dynamic context text chupinchadaniki
  const getButtonText = (): string => {
    if (isSubmitting) return 'Creating account...';
    if (isLoading) return 'Please wait...';
    return 'Sign Up';
  };

  return (
    <button
      type="submit"
      disabled={isPending}
      className="bg-primary text-primary-foreground hover:bg-primary-hover focus:ring-ring focus:ring-offset-background mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
    >
      {isPending ? (
        <>
          <svg
            className="text-primary-foreground h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {getButtonText()}
        </>
      ) : (
        'Sign Up'
      )}
    </button>
  );
};
