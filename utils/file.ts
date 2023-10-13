import type {Accept} from "react-dropzone";

type FileObj = {
  name: string;
  sizeKb: number;
  type: string;
  base64: string;
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const acceptedImageTypes: Accept = {
  "image/*": [".jpg", ".jpeg", ".png", ".gif"]
};

function convertBytesToMB(bytes: number) {
  return `${parseFloat((bytes / (1024 * 1024)).toFixed(2))}MB`;
}

async function convertFileToBase64(file: File) {
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
    sizeKb: Math.round(file.size / 1024),
    type: file.type,
    base64: await convertFileToBase64(file)
  };
}

export type {FileObj};

export {MAX_FILE_SIZE, acceptedImageTypes, transformFileToFileObj, convertBytesToMB};
