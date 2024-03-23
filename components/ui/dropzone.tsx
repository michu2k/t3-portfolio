import React, {Fragment, useCallback} from "react";
import {UploadCloudIcon} from "lucide-react";
import type {Accept} from "react-dropzone";
import {useDropzone} from "react-dropzone";
import {Button} from "~/components/ui/button";
import type {FileObj} from "~/utils/file";
import {MAX_FILE_SIZE, convertBytesToMB, transformFileToFileObj} from "~/utils/file";
import {cn} from "~/utils/className";

type DropzoneProps = {
  name: string;
  accept: Accept;
  maxSize?: number;
  disabled?: boolean;
} & (
  | {
      multiple: true;
      onDrop: (files: Array<FileObj>) => void;
    }
  | {
      multiple?: false;
      onDrop: (file: FileObj) => void;
    }
);

const Dropzone = ({name, onDrop, maxSize = MAX_FILE_SIZE, multiple, disabled, accept, ...props}: DropzoneProps) => {
  const onFileDrop = useCallback(
    async (acceptedFiles: Array<File>) => {
      const result = await Promise.all<FileObj>(
        acceptedFiles.map((file) => new Promise<FileObj>((resolve) => resolve(transformFileToFileObj(file))))
      );

      if (multiple) {
        onDrop(result);
      } else {
        if (!!result[0]) {
          onDrop(result[0]);
        }
      }
    },
    [onDrop, multiple]
  );

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop: (args) => void onFileDrop(args),
    multiple,
    maxSize,
    disabled,
    accept
  });

  function displayExtensions() {
    return Object.values(accept)
      .flat()
      .map((ext, idx, arr) => {
        const isLastElement = idx === arr.length - 1;
        const isLastTwoElements = idx >= arr.length - 2;

        return (
          <Fragment key={ext}>
            {isLastElement && " and "}
            <strong>{ext.replace(".", "").toUpperCase()}</strong>
            {!isLastTwoElements && ", "}
          </Fragment>
        );
      });
  }

  return (
    <Button
      variant="outline"
      className={cn("flex min-h-[6rem] cursor-pointer gap-6 border-2 border-dashed px-3 py-4", {
        "cursor-not-allowed opacity-50": disabled
      })}
      asChild>
      <div {...getRootProps()}>
        <input {...props} {...getInputProps({name})} />
        <UploadCloudIcon size={40} strokeWidth={1} />

        <div className="flex flex-1 flex-col gap-1">
          <p className="text-xs leading-6 text-muted-foreground">
            {isDragActive
              ? `Drop the ${multiple ? "files" : "file"} here...`
              : `Drag and drop ${multiple ? "files" : "file"} here or click to select ${multiple ? "files" : "file"}`}
          </p>

          <p className="text-xs leading-6 text-muted-foreground">
            Only {displayExtensions()} files with max size of <strong>{convertBytesToMB(maxSize)}</strong>
          </p>
        </div>
      </div>
    </Button>
  );
};

export {Dropzone};
