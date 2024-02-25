"use client";

import React from "react";
import {MoonIcon, SunIcon} from "lucide-react";
import {useTheme} from "next-themes";
import {capitalize} from "~/utils/capitalize";

const ThemeSwitch = () => {
  const {theme = "", setTheme} = useTheme();

  const isDarkMode = theme === "dark";

  return (
    <div className="flex items-center gap-3 px-2">
      <div className="relative">
        <label className="flex h-7 w-fit cursor-pointer items-center rounded-full border border-muted">
          <div className="flex w-7 items-center justify-center gap-1">
            <SunIcon className="h-4 w-4" />
            <p className="sr-only">Light</p>
          </div>

          <div className="flex w-7 items-center justify-center gap-1">
            <MoonIcon className="h-4 w-4" />
            <p className="sr-only">Dark</p>
          </div>

          <input
            type="checkbox"
            className="absolute h-0 w-0 opacity-0"
            onChange={() => setTheme(isDarkMode ? "light" : "dark")}
          />

          <span
            className={`absolute h-full w-full rounded-full p-1 before:absolute before:block before:h-5 before:w-5 before:rounded-full before:bg-secondary ${
              isDarkMode ? "before:translate-x-7" : ""
            } transition-colors before:transition-transform`}
          />
        </label>
      </div>

      <p className="font-poppins text-xs font-medium">{capitalize(theme)}</p>
    </div>
  );
};

export {ThemeSwitch};
