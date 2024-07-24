import type {Accept} from "react-dropzone";

type FileObj = {
  name: string;
  url: string;
  size: number;
  type: string;
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

// Only accept files with the specific extension or MIME type
// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept#limiting_accepted_file_types
const acceptedImageTypes: Accept = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/gif": [".gif"],
  "image/webp": [".webp"]
};

function convertBytesToMB(bytes: number) {
  return `${parseFloat((bytes / (1024 * 1024)).toFixed(2))}MB`;
}

function getFileExtension(file: FileObj | string) {
  const _file = typeof file === "string" ? file : file.type;
  return _file.match(/\w*$/gi)?.[0].toLowerCase() || "";
}

async function _convertFileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

async function transformFileToFileObj(file: File): Promise<FileObj> {
  return {
    name: file.name,
    url: await _convertFileToBase64(file),
    size: file.size,
    type: file.type
  };
}

export type {FileObj};

export {MAX_FILE_SIZE, acceptedImageTypes, getFileExtension, transformFileToFileObj, convertBytesToMB};
