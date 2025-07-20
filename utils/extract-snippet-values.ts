import type { Snippets } from "~/server/api/routers/snippet";

export type SnippetValues<T extends string> = {
  [key in T]: string;
};

/** Get the snippet values from the array */
export function extractSnippetValues<T extends string>(data: Snippets): Partial<SnippetValues<T>> {
  if (data.length) {
    return data.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }

  return {};
}
