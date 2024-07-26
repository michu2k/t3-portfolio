import React from "react";
import type {VariantProps} from "class-variance-authority";
import {cva} from "class-variance-authority";
import {FileIcon} from "lucide-react";
import Image from "next/image";

import {cn} from "~/utils/className";
import {convertBytesToMB, type FileObj} from "~/utils/file";

const fileThumbnailVariants = cva(
  "relative flex items-center justify-center overflow-hidden rounded-md bg-accent shrink-0",
  {
    variants: {
      size: {
        sm: "h-16 w-20 md:w-24",
        md: "h-24 w-36"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

type FileThumbnailProps = VariantProps<typeof fileThumbnailVariants> & {
  file: FileObj;
  className?: string;
};

const FileThumbnail = ({file, size, className}: FileThumbnailProps) => {
  const {url, type} = file;
  const isImage = type.includes("image");

  return (
    <div className={cn(fileThumbnailVariants({size}), className)}>
      {url && isImage ? (
        // Priority is set to true by default as the component will always be above the fold
        <Image src={url} fill style={{objectFit: "cover"}} sizes="192px" alt="" priority />
      ) : (
        <FileIcon className="size-12 stroke-1 text-muted-foreground" />
      )}
    </div>
  );
};

type FileThumbnailCardProps = {
  file: FileObj;
  className?: string;
  actions?: React.ReactNode;
};

const FileThumbnailCard = React.forwardRef<HTMLDivElement, FileThumbnailCardProps>(
  ({file, className, actions}, ref) => {
    return (
      <div ref={ref} className={cn("flex min-h-[5.5rem] gap-4", className)}>
        <FileThumbnail file={file} />

        <div className="flex min-w-0 flex-1 flex-col items-start">
          <p className="w-full truncate font-poppins text-xs font-semibold">{file.name}</p>
          <p className="mb-auto text-xs leading-6 text-muted-foreground">{convertBytesToMB(file.size)}</p>

          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </div>
      </div>
    );
  }
);

FileThumbnailCard.displayName = "FileThumbnailCard";

export {FileThumbnail, FileThumbnailCard};
