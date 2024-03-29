import type {Snippet, SnippetType} from "@prisma/client";
import {usePathname} from "next/navigation";
import {api} from "~/trpc/react";
import {revalidatePath} from "~/utils/revalidate-path";

type SnippetValues<T extends string> = {
  [key in T]: string;
};

/** Get the snippet values */
function getSnippetValues<T extends string>(data: Array<Snippet>): Partial<SnippetValues<T>> {
  if (data.length) {
    return data.reduce((acc, {name, value}) => ({...acc, [name]: value}), {});
  }

  return {};
}

const useSnippets = <T extends string>(type: SnippetType, data: Array<Snippet>) => {
  const updateSnippet = api.snippet.updateSnippet.useMutation();
  const createSnippet = api.snippet.createSnippet.useMutation();
  const pathname = usePathname();
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
      await utils.snippet.getSnippets.invalidate();
      revalidatePath(pathname);
    });
  }

  return updateSnippets;
};

export {useSnippets, getSnippetValues};
