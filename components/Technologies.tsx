import React from "react";
import {PageSection} from "./generics/PageSection";

const frontend = [
  "HTML",
  "CSS",
  "Tailwind",
  "SASS",
  "Styled Components",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "jQuery",
  "Bootstrap",
  "Material UI",
  "Chakra UI",
  "Storybook",
  "Framer Motion"
];

const backend = [
  "Node.js",
  "Express",
  "MongoDB",
  "MySQL",
  "GraphQL",
  "Apollo",
  "Prisma"
];

const testing = [
  "Jest",
  "React Testing Library",
  "Cypress"
];

const tools = [
  "Git",
  "GitHub",
  "Jira",
  "Figma",
  "Adobe XD",
  "Photoshop",
  "Illustrator"
];

const Technologies = () => {

  function displayTechnologies(heading: string, technologies: Array<string>) {
    return (
      <article className="mb-8 last-of-type:mb-0">
        <h3 className="font-semibold text-md mb-3 text-slate-700">
          {heading}
        </h3>

        <div className="flex flex-wrap gap-2">
          {technologies.map((name) => (
            <div key={name} className="bg-neutral-50 px-4 rounded">
              <p className="font-medium text-xs text-slate-700 leading-8">{name}</p>
            </div>
          ))}
        </div>
      </article>
    );
  }

  return (
    <PageSection heading="Skills">
      {displayTechnologies("Frontend", frontend)}
      {displayTechnologies("Backend", backend)}
      {displayTechnologies("Testing", testing)}
      {displayTechnologies("Tools", tools)}
    </PageSection>
  );
};

export {Technologies};