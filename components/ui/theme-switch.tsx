"use client";

import React, {useEffect, useState} from "react";
import {MoonIcon, SunIcon} from "lucide-react";
import {useTheme} from "next-themes";

import {capitalize} from "~/utils/capitalize";

const ThemeSwitch = () => {
  const {theme = "", setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDarkMode = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-w-28 items-center gap-2 px-2">
      <div className="relative">
        <label className="flex h-7 w-fit cursor-pointer items-center rounded-full border border-muted">
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

          {mounted ? (
            <span
              className={`absolute size-full rounded-full p-1 animate-in fade-in before:absolute before:block before:size-5 before:rounded-full before:bg-muted ${
                isDarkMode ? "before:translate-x-7" : ""
              } transition-colors before:transition-transform`}
            />
          ) : null}
        </label>
      </div>

      {mounted ? <p className="font-poppins text-xs font-medium text-muted-foreground">{capitalize(theme)}</p> : null}
    </div>
  );
};

export {ThemeSwitch};
