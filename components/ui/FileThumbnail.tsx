import Image from "next/image";
import React, {useCallback, useEffect, useState} from "react";
import {cn} from "~/utils/className";

type FileThumbnailProps = {
  file: File;
  className?: string;
};

const FileThumbnail = React.forwardRef<HTMLDivElement, FileThumbnailProps>(({file, className}, ref) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const getImageUrl = useCallback(() => {
    const reader = new FileReader();

    reader.onload = () => setFileUrl(reader.result as string);
    reader.onerror = () => {
      reader.abort();
    };
    reader.readAsDataURL(file);
  }, [file]);

  useEffect(() => {
    getImageUrl();
  }, [getImageUrl]);

  return (
    <div ref={ref} className={cn("relative h-24 w-24 overflow-hidden rounded-md bg-slate-50", className)}>
      {fileUrl ? <Image src={fileUrl} style={{objectFit: "cover"}} fill alt="" /> : null}
    </div>
  );
});

FileThumbnail.displayName = "FileThumbnail";

export {FileThumbnail};
