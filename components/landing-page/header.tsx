import React from "react";
import {getSnippetValues} from "~/hooks/use-snippets";
import {api} from "~/trpc/server";
import type {HeaderSnippetsFormValues} from "~/utils/validations/header";
import {HeaderButton} from "./header-button";

const Header = async () => {
  const data = await api.snippet.getSnippets.query({type: "HEADER", keys: ["heading", "description"]});

  const snippetValues = getSnippetValues<keyof HeaderSnippetsFormValues>(data);
  const {heading = "", description = ""} = snippetValues;

  return (
    <header id="top" className="px-4 pb-14 pt-10 md:px-6">
      <div className="section-container flex min-h-[36rem] flex-col items-start justify-center">
        <p className="mb-2 font-poppins text-xl font-semibold leading-8 text-primary">Hi there! I&apos;m</p>

        <div className="mb-8 flex w-full flex-col gap-8 md:flex-row md:items-center">
          <h1 className="font-poppins text-5xl font-bold leading-tight text-slate-900 md:text-6xl lg:text-7xl">
            {heading}
          </h1>
        </div>

        <p className="mb-12 max-w-3xl text-lg leading-8 text-slate-900">{description}</p>

        <HeaderButton />
      </div>
    </header>
  );
};

export {Header};
