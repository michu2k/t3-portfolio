import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { FileImageIcon } from "lucide-react";
import Image from "next/image";

import { cn } from "~/utils/cn";
import { convertBytesToMB, type FileObj } from "~/utils/file";

const imageThumbnailVariants = cva(
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

type ImageThumbnailProps = VariantProps<typeof imageThumbnailVariants> & {
  file: FileObj | null;
  className?: string;
};

export const ImageThumbnail = ({ file, size, className }: ImageThumbnailProps) => {
  const { url, type } = file ?? {};
  const isImage = type?.includes("image");

  return (
    <div className={cn(imageThumbnailVariants({ size }), className)}>
      {url && isImage ? (
        // Priority is set to true by default as the component will always be above the fold
        <Image src={url} fill style={{ objectFit: "cover" }} sizes="192px" alt="" priority />
      ) : (
        <FileImageIcon size={32} className="text-muted-foreground stroke-1" />
      )}
    </div>
  );
};

type ImageThumbnailCardProps = React.ComponentProps<"div"> & {
  file: FileObj;
  actions?: React.ReactNode;
};

export const ImageThumbnailCard = ({ file, className, actions }: ImageThumbnailCardProps) => {
  return (
    <div className={cn("flex min-h-[5.5rem] gap-4", className)}>
      <ImageThumbnail file={file} />

      <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
        <p className="font-poppins w-full truncate text-xs font-semibold">{file.name}</p>
        <p className="text-muted-foreground mb-auto text-xs">{convertBytesToMB(file.size)}</p>

        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  );
};
