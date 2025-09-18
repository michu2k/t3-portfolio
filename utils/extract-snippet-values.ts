import { SnippetType } from "@prisma/client";

import type { Snippets } from "~/server/api/routers/snippet";

export type SnippetTypeMap = {
  [SnippetType.HEADER]: {
    heading: string;
    description: string;
  };
  [SnippetType.ABOUT_ME]: {
    description: string;
    image: string;
  };
  [SnippetType.CONTACT]: {
    description: string;
  };
};

/** Get the snippet values from the array */
export function extractSnippetValues<T extends SnippetType>(data: Snippets): Partial<SnippetTypeMap[T]> {
  if (data.length) {
    return data.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }

  return {};
}
