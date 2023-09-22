import type {Snippet, SnippetType} from "@prisma/client";
import {api} from "~/utils/api";

/** Bulk update section snippets for the given type */
const useUpdateSnippets = <T extends Record<string, string>>(type: SnippetType, data: Array<Snippet>) => {
  const updateSnippet = api.snippet.updateSnippet.useMutation();
  const createSnippet = api.snippet.createSnippet.useMutation();
  const utils = api.useContext();

  async function updateSnippets(snippets: T) {
    const promises = Object.entries(snippets).map(async ([key, value]) => {
      const snippetId = data.find((snippet) => snippet.name === key)?.id;

      if (snippetId) {
        return await updateSnippet.mutateAsync({id: snippetId, value});
      }

      return await createSnippet.mutateAsync({type, name: key, value});
    });

    await Promise.all(promises).then(async () => {
      await utils.snippet.getSnippets.invalidate();
    });
  }

  return updateSnippets;
};

export {useUpdateSnippets};
