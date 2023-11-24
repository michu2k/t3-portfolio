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
      <div className="flex flex-col gap-14 md:flex-row md:items-center">
        {imageObj ? (
          <div className="relative my-auto h-48 w-56 flex-shrink-0 rounded-lg after:absolute after:-bottom-2 after:-right-2 after:left-24 after:top-10 after:-z-10 after:rounded-br-2xl after:bg-secondary md:h-80 md:w-72">
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-slate-100">
              <Image src={imageObj.url} fill alt="" style={{objectFit: "cover"}} />
            </div>
          </div>
        ) : null}

        <div className="max-w-md flex-1">
          <p className="text-sm leading-7">{description}</p>
        </div>
      </div>
    </PageSection>
  );
};

export {AboutMe};
