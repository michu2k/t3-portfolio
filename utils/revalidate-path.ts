"use server";

import { revalidatePath as nextRevalidatePath } from "next/cache";

/** A Custom revalidatePath function that can be called from client-side components.*/
export const revalidatePath = (path: string) => {
  nextRevalidatePath(path);
};
