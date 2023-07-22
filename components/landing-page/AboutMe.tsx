import React from "react";
import {PageSection} from "~/components/PageSection";
import Image from "next/image";

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
];

const image = "https://picsum.photos/id/821/4403/2476";

const AboutMe = () => {

  function displaySkills() {
    return skills.map((name) => (
      <li key={name} className="bg-neutral-200 px-4 rounded-full">
        <p className="text-xs text-slate-700 leading-7">{name}</p>
      </li>
    ));
  }

  return (
    <PageSection id="about" heading="Who Am I?" subheading="About Me">
      <div className="grid md:grid-cols-[20rem_1fr] gap-16">
        <div className="
          h-80 md:h-96 my-auto
          rounded-lg
          relative
          after:absolute
          after:bg-primary
          after:rounded-br-2xl
          after:top-10
          after:left-24
          after:-right-2
          after:-bottom-2
          after:-z-10">
          <div className="
            w-full h-full
            rounded-lg
            bg-slate-100
            overflow-hidden relative">
            <Image src={image} fill alt="" style={{objectFit: "cover"}} />
          </div>
        </div>

        <div>
          <p className="text-md leading-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nihil incidunt accusamus mollitia exercitationem sapiente quasi qui eligendi architecto non dolor.
          Autem consectetur et voluptatum labore accusantium magni. Laudantium quia vitae quas provident nostrum adipisci.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, voluptates.
          </p>

          <div className="mt-14">
            <h3 className="font-semibold text-xl text-slate-700 mb-10">My Skills</h3>

            <ul className="flex flex-wrap gap-2">
              {displaySkills()}
              <li className="px-2">
                <p className="text-xs leading-7">& more...</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </PageSection>
  );
};

export {AboutMe};