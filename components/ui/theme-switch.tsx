"use client";

import React, { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { capitalize } from "~/utils/capitalize";

export const ThemeSwitch = () => {
  const { theme = "", setTheme } = useTheme();
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const isDarkMode = theme === "dark";

  return (
    <div className="flex min-w-28 items-center gap-2 px-2">
      <div className="relative">
        <label className="border-muted flex h-7 w-fit cursor-pointer items-center rounded-full border">
          <div className="flex w-7 items-center justify-center gap-1">
            <SunIcon size={16} />
            <p className="sr-only">Light</p>
          </div>

          <div className="flex w-7 items-center justify-center gap-1">
            <MoonIcon size={16} />
            <p className="sr-only">Dark</p>
          </div>

          <input
            type="checkbox"
            className="absolute size-0 opacity-0"
            onChange={() => setTheme(isDarkMode ? "light" : "dark")}
          />

          {isMounted ? (
            <span
              className={`animate-in fade-in before:bg-muted absolute size-full rounded-full p-1 before:absolute before:block before:size-5 before:rounded-full ${
                isDarkMode ? "before:translate-x-7" : ""
              } transition-colors before:transition-transform`}
            />
          ) : null}
        </label>
      </div>

      {isMounted ? <p className="font-poppins text-muted-foreground text-xs font-medium">{capitalize(theme)}</p> : null}
    </div>
  );
};
