import React from "react";
import {cn} from "~/utils/className";
import {FileThumbnail} from "~/components/ui/FileThumbnail";
import {convertBytesToMB} from "~/utils/file";

type ImageCardProps = {
  file: File;
  className?: string;
  actions?: React.ReactNode;
};

const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(({file, className, actions}, ref) => {
  return (
    <div ref={ref} className={cn("flex min-h-[5.5rem] gap-4", className)}>
      <FileThumbnail file={file} className="w-36" />

      <div className="flex flex-1 flex-col items-start">
        <p className="text-sm font-semibold">{file.name}</p>
        <p className="mb-auto text-xs leading-6 text-slate-500">{convertBytesToMB(file.size)}</p>

        {actions}
      </div>
    </div>
  );
});

ImageCard.displayName = "ImageCard";

export {ImageCard};
