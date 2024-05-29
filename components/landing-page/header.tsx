import React from "react";
import {SnippetType} from "@prisma/client";

import {extractSnippetValues} from "~/hooks/use-snippets";
import {getSnippetData} from "~/server/getSnippetData";
import type {HeaderSnippetsFormValues} from "~/utils/validations/header";

import {HeaderButtons} from "./header-buttons";

const Header = async () => {
  const data = await getSnippetData(SnippetType.HEADER);

  const snippetValues = extractSnippetValues<keyof HeaderSnippetsFormValues>(data);
  const {heading = "", description = ""} = snippetValues;

  return (
    <header id="top" className="px-4 py-20 md:px-6 md:py-24">
      <div className="section-container flex min-h-[30rem] flex-col items-start justify-center">
        <div className="mb-8 flex w-full flex-col gap-8 md:flex-row md:items-center">
          <h1 className="font-poppins text-5xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
            {heading}
          </h1>
        </div>

        <p className="mb-12 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>

        <HeaderButtons />
      </div>
    </header>
  );
};

export {Header};
