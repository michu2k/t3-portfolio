import React from "react";
import Link from "next/link";
import {api} from "~/utils/api";
import type {HeaderSnippetsFormValues} from "~/utils/validations/header";
import {getSnippetValues} from "~/hooks/useSnippets";
import {buttonVariants} from "../ui/Button";
import {cn} from "~/utils/className";

const Header = () => {
  const {data = []} = api.snippet.getSnippets.useQuery({type: "HEADER", keys: ["heading", "description"]});

  const snippetValues = getSnippetValues<keyof HeaderSnippetsFormValues>(data);
  const {heading = "", description = ""} = snippetValues;

  return (
    <header id="top" className="px-4 pb-14 pt-10 md:px-6">
      <div className="section-container flex min-h-[30rem] flex-col items-start justify-center">
        <div className="mb-8 flex w-full flex-col gap-8 md:flex-row md:items-center">
          <h1 className="font-poppins text-4xl font-bold text-slate-900 md:text-5xl lg:text-6xl">{heading}</h1>
        </div>

        <p className="text-md mb-12 max-w-2xl leading-7">{description}</p>

        <Link
          href="#keep-in-touch"
          className={cn(buttonVariants({variant: "lp-primary", size: "md"}), "text-md h-12 px-12")}>
          Let&apos;s talk
        </Link>
      </div>
    </header>
  );
};

export {Header};
