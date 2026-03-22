import { SnippetType } from "~/prisma/generated/client";
import type { Snippets, SnippetTypeMap } from "~/server/api/routers/snippet";

/** Get the snippet values from the array */
export function extractSnippetValues<T extends SnippetType>(data: Snippets): Partial<SnippetTypeMap[T]> {
  if (data.length) {
    return data.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }

  return {};
}
