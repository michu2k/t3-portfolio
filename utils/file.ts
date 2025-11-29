import type { Accept } from "react-dropzone";

export type FileObj = {
  buffer?: Uint8Array;
  name: string;
  url: string;
  size: number;
  type: string;
};

export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

// Only accept files with the specific extension or MIME type
// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept#limiting_accepted_file_types
export const acceptedImageTypes: Accept = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/avif": [".avif"]
};

export function convertBytesToMB(bytes: number) {
  return `${parseFloat((bytes / (1024 * 1024)).toFixed(2))}MB`;
}

export function getFileExtension(file: FileObj | string) {
  const _file = typeof file === "string" ? file : file.type;
  return _file.match(/\w*$/gi)?.[0].toLowerCase() || "";
}

const _convertFileToUint8Array = async (file: File): Promise<Uint8Array> => {
  const buffer = await file.arrayBuffer();
  return new Uint8Array(buffer);
};

export async function transformFileToFileObj(file: File): Promise<FileObj> {
  return {
    buffer: await _convertFileToUint8Array(file),
    name: file.name,
    url: URL.createObjectURL(file),
    size: file.size,
    type: file.type
  };
}
