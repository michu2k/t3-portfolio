import React from "react";
import {PageSection} from "~/components/ui/PageSection";
import {format} from "date-fns";
import {api} from "~/utils/api";
import type {ExperienceItem, ExperienceItemResponsibility} from "@prisma/client";

const Experience = () => {
  const {data: experienceItems = []} = api.experience.getItems.useQuery({
    include: {responsibilities: true}
  });

  function displayExperience() {
    return experienceItems.map((item) => <ExperienceListItem key={item.id} {...item} />);
  }

  return (
    <PageSection id="experience" heading="Professional Experience" subheading="03. Experience">
      <ul className="flex flex-col gap-14">{displayExperience()}</ul>
    </PageSection>
  );
};

type ExperienceListItemProps = ExperienceItem & {
  responsibilities?: Array<ExperienceItemResponsibility>;
};

const ExperienceListItem = ({startDate, endDate, company, position, responsibilities}: ExperienceListItemProps) => {
  return (
    <li className="flex flex-col items-start gap-4 md:flex-row md:gap-8">
      <div className="flex flex-col justify-center md:min-h-[4rem]">
        <span className="flex-inline min-w-[10rem] rounded-full bg-secondary px-4 py-2 text-center text-xs font-medium text-slate-700">
          {format(startDate, "MMM yyyy")} {" - "}
          {endDate ? format(endDate, "MMM yyyy") : <span className="text-primary">Present</span>}
        </span>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-center md:min-h-[4rem]">
          <p className="text-lg font-semibold leading-7 text-slate-700">{position}</p>
          <p className="text-sm font-semibold leading-7 text-slate-400">{company}</p>
        </div>

        {responsibilities?.length ? (
          <ul className="flex flex-col gap-2">
            {responsibilities.map(({id, name}) => (
              <li key={id} className="flex items-start gap-2">
                <span className="before:mt-3 before:block before:h-1 before:w-1 before:rounded-full before:bg-slate-500" />
                <p className="text-sm leading-7">{name}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
};

export {Experience};
