import type {Snippets} from "~/server/api/routers/snippet";

type SnippetValues<T extends string> = {
  [key in T]: string;
};

/** Get the snippet values from the array */
function extractSnippetValues<T extends string>(data: Snippets): Partial<SnippetValues<T>> {
  if (data.length) {
    return data.reduce((acc, {name, value}) => ({...acc, [name]: value}), {});
  }

  return {};
}

export type {SnippetValues};

export {extractSnippetValues};
