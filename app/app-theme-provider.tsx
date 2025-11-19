"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
