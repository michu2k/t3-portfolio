import React from "react";
import Image from "next/image";

import {cn} from "~/utils/className";
import type {FileObj} from "~/utils/file";
import {convertBytesToMB} from "~/utils/file";

type ImageCardProps = {
  file: FileObj;
  className?: string;
  actions?: React.ReactNode;
};

const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(({file, className, actions}, ref) => {
  return (
    <div ref={ref} className={cn("flex min-h-[5.5rem] gap-4", className)}>
      <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-md bg-accent">
        {file.url ? (
          // Priority is set to true by default as the component will always be above the fold
          <Image src={file.url} fill style={{objectFit: "cover"}} sizes="192px" alt="" priority={true} />
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start">
        <p className="w-full truncate font-poppins text-xs font-semibold">{file.name}</p>
        <p className="mb-auto text-xs leading-6 text-muted-foreground">{convertBytesToMB(file.size)}</p>

        {actions}
      </div>
    </div>
  );
});

ImageCard.displayName = "ImageCard";

export {ImageCard};
