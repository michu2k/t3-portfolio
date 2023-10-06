import type {Accept} from "react-dropzone";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

function convertBytesToMB(bytes: number) {
  return `${parseFloat((bytes / (1024 * 1024)).toFixed(2))}MB`;
}

const acceptedImageTypes: Accept = {
  "image/*": [".jpg", ".jpeg", ".png", ".gif"]
};

export {MAX_FILE_SIZE, acceptedImageTypes, convertBytesToMB};
