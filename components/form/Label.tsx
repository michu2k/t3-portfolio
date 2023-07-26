import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import {cn} from "~/utils/className";

type LabelRef = React.ElementRef<typeof LabelPrimitive.Root>;
type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;

const Label = React.forwardRef<LabelRef, LabelProps>(({className, ...props}, ref) => {

  const labelClassName = cn(
    "font-medium text-sm text-slate-700 leading-none block mb-2",
    className
  );

  return (
    <LabelPrimitive.Root ref={ref} className={labelClassName} {...props} />
  );
});

Label.displayName = "Label";

export {Label};
