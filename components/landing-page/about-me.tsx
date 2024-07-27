import React from "react";
import Image from "next/image";

import {MotionInViewWrapper} from "~/components/ui/motion-in-view-wrapper";
import type {Snippets} from "~/server/api/routers/snippet";
import {api} from "~/trpc/server";
import {extractSnippetValues} from "~/utils/extractSnippetValues";
import type {AboutMeSnippetsFormValues} from "~/utils/validations/about-me";

import {PageSection} from "./page-section";

type AboutMeProps = {
  snippets: Snippets;
};

const AboutMe = async ({snippets}: AboutMeProps) => {
  const snippetValues = extractSnippetValues<keyof AboutMeSnippetsFormValues>(snippets);
  const {description = "", image: imageId} = snippetValues;

  const imageObj = imageId ? await api.image.getImage({key: imageId}) : null;

  return (
    <PageSection id="about" heading="Personal Details" subheading="About Me">
      <div className="flex flex-col gap-12 sm:flex-row sm:items-center md:gap-14">
        {imageObj ? (
          <MotionInViewWrapper className="relative my-auto h-52 w-40 flex-shrink-0 sm:h-72 sm:w-56 md:h-96 md:w-80">
            <div className="relative h-full w-full overflow-hidden rounded-md">
              <Image
                src={imageObj.url}
                fill
                style={{objectFit: "cover"}}
                className="bg-accent"
                sizes="(min-width: 768px) 50vw, 160px"
                alt=""
              />
            </div>
          </MotionInViewWrapper>
        ) : null}

        <p className="text-base leading-8 text-muted-foreground">{description}</p>
      </div>
    </PageSection>
  );
};

export {AboutMe};
