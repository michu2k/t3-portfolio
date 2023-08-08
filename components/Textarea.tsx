import * as React from "react";
import {cn} from "~/utils/className";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({className, ...props}, ref) => {

  const textareaClassName = cn(
    `flex min-h-[80px] w-full rounded-md
    border border-slate-200
    bg-transparent px-3 py-2
    text-sm
    ring-offset-white
    placeholder:text-slate-300
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50`,
    className
  );

  return (
    <textarea ref={ref} className={textareaClassName} {...props} />
  );
});

Textarea.displayName = "Textarea";

export {Textarea};
