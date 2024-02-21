"use client";

import React from "react";
import {ThemeProvider} from "next-themes";

function AppThemeProvider({children}: {children: React.ReactNode}) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}

export {AppThemeProvider};
