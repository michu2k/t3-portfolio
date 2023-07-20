import type {ClassNameValue} from "tailwind-merge";
import {twMerge} from "tailwind-merge";

function cn(...classes: Array<ClassNameValue>) {
  return twMerge(classes);
}

export {cn};