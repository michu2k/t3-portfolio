import React from "react";
import Image from "next/image";
import {PageSection} from "~/components/ui/page-section";
import {getSnippetValues} from "~/hooks/use-snippets";
import {api} from "~/trpc/react";
import type {AboutMeSnippetsFormValues} from "~/utils/validations/about-me";

const AboutMe = () => {
  const {data = []} = api.snippet.getSnippets.useQuery({type: "ABOUT_ME", keys: ["description", "image"]});

  const snippetValues = getSnippetValues<keyof AboutMeSnippetsFormValues>(data);
  const {description = "", image: imageId} = snippetValues;

  const {data: imageObj} = api.image.getImage.useQuery({id: imageId}, {enabled: !!imageId});

  return (
    <PageSection id="about" heading="Personal Details" subheading="01. About Me">
      <div className="flex flex-col gap-14 sm:flex-row sm:items-center">
        {imageObj ? (
          <div className="relative my-auto h-64 w-56 flex-shrink-0 rounded-lg md:h-80 md:w-72">
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <Image src={imageObj.url} fill alt="" style={{objectFit: "cover"}} />
            </div>
          </div>
        ) : null}

        <div className="max-w-lg flex-1">
          <p className="text-sm leading-7">{description}</p>
        </div>
      </div>
    </PageSection>
  );
};

export {AboutMe};
