import type {PropsWithChildren} from "react";
import React, {Fragment, useCallback, useContext} from "react";
import type {Accept} from "react-dropzone";
import {useDropzone} from "react-dropzone";
import {UploadCloudIcon} from "lucide-react";

import {Button} from "~/components/ui/button";
import type {FileObj} from "~/utils/file";
import {convertBytesToMB, MAX_FILE_SIZE, transformFileToFileObj} from "~/utils/file";

type DropzoneContextProps = {
  accept: Accept;
  maxSize: number;
  isDragActive: boolean;
  multiple?: boolean;
};

const DropzoneContext = React.createContext({} as DropzoneContextProps);

type DropzoneProps = PropsWithChildren<
  {
    name: string;
    accept: Accept;
    maxSize?: number;
    disabled?: boolean;
    className?: string;
  } & (
    | {
        multiple: true;
        onDrop: (files: Array<FileObj>) => void;
      }
    | {
        multiple?: false;
        onDrop: (file: FileObj) => void;
      }
  )
>;

const Dropzone = ({
  name,
  accept,
  maxSize = MAX_FILE_SIZE,
  disabled,
  multiple,
  onDrop,
  className,
  children
}: DropzoneProps) => {
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

  return (
    <Button
      variant="outline"
      disabled={disabled}
      className={className ?? "flex h-auto cursor-pointer border-2 border-dashed px-3 py-3.5"}
      asChild>
      <div {...getRootProps()}>
        <DropzoneContext.Provider value={{accept, isDragActive, multiple, maxSize}}>
          <input {...getInputProps({name})} />
          {children}
        </DropzoneContext.Provider>
      </div>
    </Button>
  );
};

const DropzoneContent = () => {
  const {isDragActive, accept, multiple, maxSize} = useContext(DropzoneContext);

  function getAcceptedFileTypes() {
    return Object.entries(accept).reduce<Array<string>>(
      (acc, [mimeType, extensions]) =>
        extensions.length > 0 ? [...acc, ...extensions] : [...acc, mimeType.split("/")[1] as string],
      []
    );
  }

  function displayFileTypes() {
    return getAcceptedFileTypes().map((ext, idx, arr) => {
      const isLastElement = idx === arr.length - 1;

      return (
        <Fragment key={ext}>
          {isLastElement && " and "}
          <strong>{ext.replace(".", "").toUpperCase()}</strong>
          {!isLastElement && ", "}
        </Fragment>
      );
    });
  }

  return (
    <div className="flex min-h-16 flex-grow items-center gap-6">
      <UploadCloudIcon size={40} strokeWidth={1} />

      <div className="flex flex-1 flex-col gap-1">
        <p className="text-xs leading-6 text-muted-foreground">
          {isDragActive
            ? `Drop the ${multiple ? "files" : "file"} here...`
            : `Drag and drop ${multiple ? "files" : "file"} here or click to select ${multiple ? "files" : "file"}`}
        </p>

        <p className="text-xs leading-6 text-muted-foreground">
          Only {displayFileTypes()} with max size of <strong>{convertBytesToMB(maxSize)}</strong>
        </p>
      </div>
    </div>
  );
};

export {Dropzone, DropzoneContent, DropzoneContext};
