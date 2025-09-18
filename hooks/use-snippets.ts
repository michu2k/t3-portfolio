import type { SnippetType } from "@prisma/client";

import type { Snippets } from "~/server/api/routers/snippet";
import { api } from "~/trpc/react";
import type { SnippetTypeMap } from "~/utils/extract-snippet-values";

export const useSnippets = <T extends SnippetType>(type: T, data: Snippets) => {
  const updateSnippet = api.snippet.updateSnippet.useMutation();
  const createSnippet = api.snippet.createSnippet.useMutation();

  /** Bulk update section snippets for the given type */
  async function updateSnippets(snippets: Partial<SnippetTypeMap[T]>) {
    const promises = Object.entries(snippets).map(async ([key, value]) => {
      const { id, value: dbValue } = data.find((snippet) => snippet.name === key) || {};

      if (id) {
        return value === dbValue ? null : await updateSnippet.mutateAsync({ id, value });
      }

      return await createSnippet.mutateAsync({ type, name: key, value: value ?? "" });
    });

    await Promise.all(promises);
  }

  return updateSnippets;
};
