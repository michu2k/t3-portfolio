import React from "react";
import Image from "next/image";
import {PageSection} from "~/components/ui/PageSection";
import {api} from "~/utils/api";
import {getSnippetValues} from "~/hooks/useSnippets";
import type {AboutMeSnippetsFormValues} from "~/utils/validations/aboutMe";

const AboutMe = () => {
  const {data = []} = api.snippet.getSnippets.useQuery({type: "ABOUT_ME", keys: ["description", "image"]});

  const snippetValues = getSnippetValues<keyof AboutMeSnippetsFormValues>(data);
  const {description = "", image: imageId} = snippetValues;

  const {data: imageObj} = api.image.getImage.useQuery({id: imageId}, {enabled: !!imageId});

  return (
    <PageSection id="about" heading="Personal Details" subheading="01. About Me">
      <div className="flex flex-col gap-14 sm:flex-row sm:items-center md:gap-20">
        {imageObj ? (
          <div className="relative my-auto h-64 w-56 flex-shrink-0 rounded-lg after:absolute after:left-3 after:top-3 after:-z-10 after:h-full after:w-full after:rounded-lg after:border-2 after:border-secondary md:h-80 md:w-72 md:after:left-5 md:after:top-5">
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-slate-100">
              <Image src={imageObj.url} fill alt="" style={{objectFit: "cover"}} />
            </div>
          </div>
        ) : null}

        <div className="max-w-lg flex-1">
          <p className="text-md leading-8">{description}</p>
        </div>
      </div>
    </PageSection>
  );
};

export {AboutMe};
