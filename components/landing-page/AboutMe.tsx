import React from "react";
import Image from "next/image";
import {PageSection} from "~/components/ui/PageSection";
import {Heading} from "~/components/ui/Heading";

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
      <li key={name} className="rounded-full bg-neutral-200 px-4">
        <p className="text-xs leading-7 text-slate-700">{name}</p>
      </li>
    ));
  }

  return (
    <PageSection id="about" heading="Who Am I?" subheading="About Me">
      <div className="grid gap-16 md:grid-cols-[20rem_1fr]">
        <div className="relative my-auto h-80 rounded-lg after:absolute after:-bottom-2 after:-right-2 after:left-24 after:top-10 after:-z-10 after:rounded-br-2xl after:bg-primary md:h-96">
          <div className="relative h-full w-full overflow-hidden rounded-lg bg-slate-100">
            <Image src={image} fill alt="" style={{objectFit: "cover"}} />
          </div>
        </div>

        <div>
          <p className="text-md leading-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil incidunt accusamus mollitia exercitationem
            sapiente quasi qui eligendi architecto non dolor. Autem consectetur et voluptatum labore accusantium magni.
            Laudantium quia vitae quas provident nostrum adipisci. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Error, voluptates.
          </p>

          <div className="mt-14">
            <Heading as="h3" size="lg">
              My Skills
            </Heading>

            <ul className="mt-8 flex flex-wrap gap-2">
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
