import React from "react";
import {MoveRightIcon} from "lucide-react";
import {getSnippetValues} from "~/hooks/useSnippets";
import {api} from "~/trpc/react";
import type {HeaderSnippetsFormValues} from "~/utils/validations/header";
import {Button} from "~/components/ui/Button";
import {useSmoothScroll} from "~/hooks/useSmoothScroll";

const Header = () => {
  const {data = []} = api.snippet.getSnippets.useQuery({type: "HEADER", keys: ["heading", "description"]});
  const {scrollToTarget} = useSmoothScroll("#recent-work");

  const snippetValues = getSnippetValues<keyof HeaderSnippetsFormValues>(data);
  const {heading = "", description = ""} = snippetValues;

  return (
    <header id="top" className="px-4 pb-14 pt-10 md:px-6">
      <div className="section-container flex min-h-[32rem] flex-col items-start justify-center">
        <div className="mb-8 flex w-full flex-col gap-8 md:flex-row md:items-center">
          <h1 className="font-poppins text-5xl font-bold leading-tight text-slate-900 md:text-6xl lg:text-7xl">
            {heading}
          </h1>
        </div>

        <p className="mb-12 max-w-2xl text-sm leading-7">{description}</p>

        <Button variant="secondary" onClick={scrollToTarget} className="h-12 gap-6 px-8">
          See my work
          <MoveRightIcon size={20} />
        </Button>
      </div>
    </header>
  );
};

export {Header};
