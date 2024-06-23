import React from "react";
import {format} from "date-fns";

import {MotionInViewWrapper} from "~/components/ui/motion-in-view-wrapper";
import type {ExperienceItemWithResponsibilities} from "~/server/api/routers/experience";
import {api} from "~/trpc/server";

import {Separator} from "../ui/separator";
import {PageSection} from "./page-section";

const Experience = async () => {
  const experienceItems = (await api.experience.getItems({
    include: {responsibilities: true}
  })) as Array<ExperienceItemWithResponsibilities>;

  function displayExperience() {
    return experienceItems.map((item) => <ExperienceListItem key={item.id} {...item} />);
  }

  return (
    <PageSection id="experience" heading="Where I've worked" subheading="Experience">
      <ul className="flex flex-col gap-14 md:gap-16">{displayExperience()}</ul>
    </PageSection>
  );
};

const ExperienceListItem = ({
  startDate,
  endDate,
  company,
  position,
  responsibilities
}: ExperienceItemWithResponsibilities) => {
  return (
    <li className="group flex flex-col gap-2 md:flex-row md:gap-8">
      <MotionInViewWrapper transition={{delay: 0.5}} className="flex flex-col justify-center md:min-h-[2rem]">
        <span className="flex-inline mb-auto min-w-[10rem] font-poppins text-sm font-medium leading-7 text-muted-foreground transition-colors group-hover:text-primary">
          {format(startDate, "MMM yyyy")} {" - "}
          {endDate ? format(endDate, "MMM yyyy") : "Present"}
        </span>
      </MotionInViewWrapper>

      <Separator orientation="vertical" className="hidden h-auto md:block" />

      <div className="relative flex flex-col gap-6">
        <MotionInViewWrapper transition={{delay: 0.5}} className="flex flex-col justify-center gap-2 md:min-h-[4rem]">
          <p className="font-poppins text-xl font-semibold leading-7 text-foreground">{position}</p>
          <p className="text-sm leading-7 text-primary">{company}</p>
        </MotionInViewWrapper>

        {responsibilities?.length ? (
          <ul className="flex flex-col gap-2">
            {responsibilities.map(({id, name}) => (
              <li key={id} className="flex items-start gap-3">
                <span className="before:mt-3 before:block before:h-1 before:w-1 before:rounded-full before:bg-foreground" />
                <p className="text-base leading-7 text-muted-foreground">{name}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
};

export {Experience};
