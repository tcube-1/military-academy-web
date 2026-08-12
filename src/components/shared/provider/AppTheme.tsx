'use client';
import { ThemeProvider } from 'next-themes';
import React from 'react';

function AppTheme({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}

export default AppTheme;
