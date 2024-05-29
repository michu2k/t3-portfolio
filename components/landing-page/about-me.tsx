import React from "react";
import {SnippetType} from "@prisma/client";
import Image from "next/image";

import {getSnippetData} from "~/server/getSnippetData";
import {api} from "~/trpc/server";
import {extractSnippetValues} from "~/utils/extractSnippetValues";
import type {AboutMeSnippetsFormValues} from "~/utils/validations/about-me";

import {PageSection} from "./page-section";

const AboutMe = async () => {
  const data = await getSnippetData(SnippetType.ABOUT_ME);

  const snippetValues = extractSnippetValues<keyof AboutMeSnippetsFormValues>(data);
  const {description = "", image: imageId} = snippetValues;

  const imageObj = imageId ? await api.image.getImage({key: imageId}) : null;

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
