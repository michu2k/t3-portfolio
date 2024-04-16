import React from "react";
import Image from "next/image";
import {getSnippetValues} from "~/hooks/use-snippets";
import {api} from "~/trpc/server";
import {PageSection} from "./page-section";
import type {AboutMeSnippetsFormValues} from "~/utils/validations/about-me";

const AboutMe = async () => {
  const data = await api.snippet.getSnippets.query({type: "ABOUT_ME", keys: ["description", "image"]});

  const snippetValues = getSnippetValues<keyof AboutMeSnippetsFormValues>(data);
  const {description = "", image: imageId} = snippetValues;

  const imageObj = imageId ? await api.image.getImage.query({key: imageId}) : null;

  return (
    <PageSection id="about" heading="Personal Details" subheading="About Me">
      <div className="flex flex-col gap-14 sm:flex-row sm:items-center">
        {imageObj ? (
          <div className="relative my-auto h-80 w-full flex-shrink-0 sm:w-64 md:h-96 md:w-80">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={imageObj.url}
                fill
                style={{objectFit: "cover"}}
                className="bg-accent"
                sizes="(min-width: 768px) 50vw, 75vw"
                alt=""
              />
            </div>
          </div>
        ) : null}

        <p className="text-lg leading-8 text-muted-foreground">{description}</p>
      </div>
    </PageSection>
  );
};

export {AboutMe};
