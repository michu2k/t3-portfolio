import * as React from "react";
import { ScrollIcon } from "lucide-react";

type EmptySectionProps = React.ComponentProps<"div"> & {
  heading: string;
  description?: string;
};

export const EmptySection = ({ heading, description }: EmptySectionProps) => {
  return (
    <div className="min-h-24 w-full py-4">
      <div className="bg-accent flex w-full items-center gap-4 rounded-lg px-3 py-6">
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
};
