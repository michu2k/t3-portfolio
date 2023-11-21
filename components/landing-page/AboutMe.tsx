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
    <PageSection id="about" heading="Personal Details" subheading="About Me">
      <div className="flex flex-col gap-16 md:flex-row md:gap-24">
        {imageObj ? (
          <div className="relative my-auto h-80 flex-shrink-0 rounded-lg after:absolute after:-bottom-2 after:-right-2 after:left-24 after:top-10 after:-z-10 after:rounded-br-2xl after:bg-secondary md:h-96 md:w-80">
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-slate-100">
              <Image src={imageObj.url} fill alt="" style={{objectFit: "cover"}} />
            </div>
          </div>
        ) : null}

        <div className="flex-1">
          <p className="text-sm leading-8">{description}</p>
        </div>
      </div>
    </PageSection>
  );
};

export {AboutMe};
