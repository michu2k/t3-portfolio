import * as React from "react";
import {cn} from "~/utils/className";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(({className, type, ...props}, ref) => {

  const inputClassName = cn(
    `flex h-10 w-full rounded-md
    border border-input
    bg-background px-3 py-2
    text-sm
    ring-offset-background
    file:border-0 file:bg-transparent file:text-sm file:font-medium
    placeholder:text-slate-300
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50`,
    className
  );

  return (
    <input ref={ref} type={type} className={inputClassName} {...props} />
  );
});

Input.displayName = "Input";

export {Input};