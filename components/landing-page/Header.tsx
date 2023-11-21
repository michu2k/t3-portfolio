import React from "react";
import Link from "next/link";
import Image from "next/image";
import {api} from "~/utils/api";
import type {HeaderSnippetsFormValues} from "~/utils/validations/header";
import {getSnippetValues} from "~/hooks/useSnippets";

const Header = () => {
  const {data = []} = api.snippet.getSnippets.useQuery({type: "HEADER", keys: ["heading", "description", "image"]});

  const snippetValues = getSnippetValues<keyof HeaderSnippetsFormValues>(data);
  const {heading = "", description = "", image: imageId} = snippetValues;

  const {data: imageObj} = api.image.getImage.useQuery({id: imageId}, {enabled: !!imageId});

  return (
    <header id="top" className="px-4 pb-16 pt-10 md:px-6">
      <div className="section-container flex min-h-[32rem] flex-col items-start justify-center">
        <div className="mb-8 flex w-full flex-col gap-8 md:flex-row md:items-center">
          {imageObj ? (
            <div className="relative my-auto flex h-28 w-28 items-center justify-center after:absolute after:-left-2 after:-top-2 after:-z-10 after:h-32 after:w-32 after:rounded-full after:border-8 after:border-transparent after:border-r-secondary after:border-t-secondary">
              <div className="relative h-28 w-28 overflow-hidden rounded-full bg-slate-100">
                <Image src={imageObj.url} fill style={{objectFit: "cover"}} alt="" />
              </div>
            </div>
          ) : null}

          <h1 className="text-4xl font-bold text-slate-900 lg:text-6xl">{heading}</h1>
        </div>

        <p className="text-md md:text-md mb-12 max-w-2xl font-medium leading-8">{description}</p>

        <Link
          href="#keep-in-touch"
          className="text-md inline-flex h-12 items-center rounded-full bg-primary px-12 font-semibold text-white transition-colors hover:bg-secondary hover:text-slate-900">
          Let&apos;s talk
        </Link>
      </div>
    </header>
  );
};

export {Header};
