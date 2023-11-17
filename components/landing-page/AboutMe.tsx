import React from "react";
import Image from "next/image";
import {PageSection} from "~/components/ui/PageSection";
import {api} from "~/utils/api";
import {getSnippetValues} from "~/hooks/useSnippets";
import type {AboutMeSnippetsFormValues} from "~/utils/validations/aboutMe";

/*
Temporary disabled
const skills = [
  "HTML",
  "CSS",
  "SASS",
  "Tailwind",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Storybook",
  "Framer Motion",
  "Node.js",
  "Express",
  "GraphQL",
  "Prisma",
  "Adobe XD",
  "Figma",
  "Cypress",
  "Git"
]; */

const AboutMe = () => {
  const {data = []} = api.snippet.getSnippets.useQuery({type: "ABOUT_ME", keys: ["description", "image"]});

  const snippetValues = getSnippetValues<keyof AboutMeSnippetsFormValues>(data);
  const {description = "", image: imageId} = snippetValues;

  const {data: imageObj} = api.image.getImage.useQuery({id: imageId}, {enabled: !!imageId});

  // Temporary disabled
  /*   function displaySkills() {
    return skills.map((name) => (
      <li key={name} className="rounded-full bg-neutral-200 px-4">
        <p className="text-xs leading-7 text-slate-700">{name}</p>
      </li>
    ));
  }
 */
  return (
    <PageSection id="about" heading="Who Am I?" subheading="About Me">
      <div className="grid gap-16 md:grid-cols-[20rem_1fr]">
        {imageObj ? (
          <div className="relative my-auto h-80 rounded-lg after:absolute after:-bottom-2 after:-right-2 after:left-24 after:top-10 after:-z-10 after:rounded-br-2xl after:bg-primary md:h-96">
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-slate-100">
              <Image src={imageObj.url} fill alt="" style={{objectFit: "cover"}} />
            </div>
          </div>
        ) : null}

        <div>
          <p className="text-md leading-8">{description}</p>

          {/* Temporary disabled */}
          {/*  <div className="mt-14">
            <Heading as="h3" size="lg">
              My Skills
            </Heading>

            <ul className="mt-8 flex flex-wrap gap-2">
              {displaySkills()}
              <li className="px-2">
                <p className="text-xs leading-7">& more...</p>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </PageSection>
  );
};

export {AboutMe};
