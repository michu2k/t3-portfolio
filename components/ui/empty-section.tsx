import React from "react";
import {ScrollIcon} from "lucide-react";

type EmptySectionProps = {
  heading: string;
  description?: string;
};

const EmptySection = React.forwardRef<HTMLDivElement, EmptySectionProps>(({heading, description}, ref) => {
  return (
    <div ref={ref} className="min-h-[6rem] w-full py-4">
      <div className="flex w-full items-center gap-4 rounded-lg bg-accent px-3 py-6">
        <ScrollIcon size={56} strokeWidth={1} />

        <div className="flex flex-1 flex-col gap-2">
          <p className="font-poppins text-sm font-semibold">{heading}</p>
          <p className="text-xs leading-5">
            {description ?? "You don't have any items yet. Add new items by clicking the action below."}
          </p>
        </div>
      </div>
    </div>
  );
});

EmptySection.displayName = "EmptySection";

export {EmptySection};
