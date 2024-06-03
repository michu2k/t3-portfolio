import {SnippetType} from "@prisma/client";

import {api} from "~/trpc/server";

import type {Snippets} from "./api/routers/snippet";

const snippetKeys: {[key in SnippetType]: Array<string>} = {
  [SnippetType.HEADER]: ["heading", "description"],
  [SnippetType.ABOUT_ME]: ["description", "image"],
  [SnippetType.CONTACT]: ["description"]
};

async function getSnippetData(type: SnippetType): Promise<Snippets> {
  return await api.snippet.getSnippetsByType({type, keys: snippetKeys[type]});
}

export {getSnippetData};
