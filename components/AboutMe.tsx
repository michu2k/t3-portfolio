import React from "react";
import {PageSection} from "./generics/PageSection";

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
  "Express",
  "GraphQL",
  "Prisma",
  "Adobe XD",
  "Figma",
  "Cypress",
  "Git"
];

const AboutMe = () => {

  function displaySkills() {
    return skills.map((name) => (
      <li key={name} className="bg-neutral-50 px-4 rounded">
        <p className="font-medium text-xs text-slate-700 leading-8">{name}</p>
      </li>
    ));
  }

  return (
    <PageSection heading="About Me">
      <p className="text-md text-slate-600 leading-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Nihil incidunt accusamus mollitia exercitationem sapiente quasi qui eligendi architecto non dolor.
        Autem consectetur et voluptatum labore accusantium magni. Laudantium quia vitae quas provident nostrum adipisci.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, voluptates.
      </p>

      <div className="mt-14">
        <h3 className="font-semibold text-lg mb-3">My Skills</h3>
        {/* <hr className="h-1 w-10 mb-4 bg-primary border-0 rounded-md" /> */}
        <p className="text-md text-slate-600 leading-8 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <ul className="flex flex-wrap gap-2">
          {displaySkills()}
          <li className="px-2">
            <p className="text-xs text-slate-400 leading-8">& more...</p>
          </li>
        </ul>
      </div>
    </PageSection>
  );
};

export {AboutMe};