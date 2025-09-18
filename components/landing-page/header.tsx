import * as React from "react";
import type { SnippetType } from "@prisma/client";

import { MotionInViewWrapper } from "~/components/ui/motion-in-view-wrapper";
import type { Snippets } from "~/server/api/routers/snippet";
import { extractSnippetValues } from "~/utils/extract-snippet-values";

import { HeaderButtons } from "./header-buttons";

type HeaderProps = {
  snippets: Snippets;
};

const Header = async ({ snippets }: HeaderProps) => {
  const snippetValues = extractSnippetValues<typeof SnippetType.HEADER>(snippets);
  const { heading = "", description = "" } = snippetValues;

  return (
    <header id="top" className="px-4 py-20 md:px-6 md:py-24">
      <div className="section-container flex min-h-[30rem] flex-col items-start justify-center">
        <MotionInViewWrapper className="mb-8 flex w-full flex-col gap-8 md:flex-row md:items-center">
          <h1 className="font-poppins text-foreground text-5xl leading-tight font-bold md:text-6xl lg:text-7xl">
            {heading}
          </h1>
        </MotionInViewWrapper>

        <MotionInViewWrapper transition={{ delay: 0.35 }}>
          <p className="text-muted-foreground mb-12 max-w-3xl text-lg leading-8">{description}</p>
        </MotionInViewWrapper>

        <HeaderButtons />
      </div>
    </header>
  );
};

export { Header };
