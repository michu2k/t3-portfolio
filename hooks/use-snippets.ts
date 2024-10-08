import type {SnippetType} from "@prisma/client";

import type {Snippets} from "~/server/api/routers/snippet";
import {api} from "~/trpc/react";
import type {SnippetValues} from "~/utils/extract-snippet-values";

const useSnippets = <T extends string>(type: SnippetType, data: Snippets) => {
  const updateSnippet = api.snippet.updateSnippet.useMutation();
  const createSnippet = api.snippet.createSnippet.useMutation();
  const utils = api.useUtils();

  /** Bulk update section snippets for the given type */
  async function updateSnippets(snippets: Partial<SnippetValues<T>>) {
    const promises = Object.entries<string | undefined>(snippets).map(async ([key, value]) => {
      const {id, value: dbValue} = data.find((snippet) => snippet.name === key) || {};

      if (id) {
        return value === dbValue ? null : await updateSnippet.mutateAsync({id, value});
      }

      return await createSnippet.mutateAsync({type, name: key, value: value ?? ""});
    });

    await Promise.all(promises).then(async () => {
      await utils.snippet.getSnippetsByType.invalidate({type});
    });
  }

  return updateSnippets;
};

export {useSnippets};
