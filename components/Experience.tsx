import React from "react";
import {PageSection} from "./generics/PageSection";
import {format} from "date-fns";

const experienceItems: Array<ExperienceItemProps> = [
  {
    id: 1,
    from: new Date("2019, 8, 1").toString(),
    to: null,
    position: "Lead Javascript Developer",
    companyName: "Lorem Software",
    responsibilities: [
      "Managing a team of 5 developers, including code reviews and mentoring",
      "Implementing new features to the XYZ application",
      "Creating a new application for the company's internal use"
    ]
  },
  {
    id: 2,
    from: new Date("2016, 3, 1").toString(),
    to: new Date("2019, 8, 1").toString(),
    position: "Javascript Developer",
    companyName: "Lorem Software",
    responsibilities: [
      "Implemented interactive features and animations to enhance user experience.",
      "Developed and maintained the company's website",
      "Preparing & maintaining documentation for the XYZ application"
    ]
  },
  {
    id: 3,
    from: new Date("2015, 11, 1").toString(),
    to: new Date("2016, 3, 1").toString(),
    position: "Junior Frontend Developer",
    companyName: "IpsumCode",
    responsibilities: [
      "Translated design mockups into pixel-perfect, responsive web interfaces using HTML, CSS, and JavaScript"
    ]
  }
];

const Experience = () => {

  function displayExperience() {
    return experienceItems.map((item) => (
      <ExperienceItem key={item.id} {...item} />
    ));
  }

  return (
    <PageSection id="experience" heading="Professional Experience" subheading="Experience">
      <ul className="flex flex-col gap-14">
        {displayExperience()}
      </ul>
    </PageSection>
  );
};

type ExperienceItemProps = {
  id: number;
  from: string | null;
  to: string | null;
  companyName: string;
  position: string;
  responsibilities?: Array<string>;
}

const ExperienceItem = ({from, to, companyName, position, responsibilities}: ExperienceItemProps) => {
  return (
    <li className="flex flex-col items-start gap-4 md:flex-row md:gap-6">
      <div className="flex flex-col justify-center md:min-h-[4rem] ">
        <span className="
          text-xs text-slate-700 text-center
          py-2 px-4 rounded-full
          min-w-[10rem]
          flex-inline
          bg-neutral-200">
          {from ? format(new Date(from), "MMM yyyy") : "-"} {" - "}
          {to ? format(new Date(to), "MMM yyyy") : "Now"}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-center md:min-h-[4rem]">
          <p className="font-semibold text-lg leading-8 text-slate-700">{position}</p>
          <p className="font-semibold text-sm text-slate-400 leading-7">
            {companyName}
          </p>
        </div>

        <ul>
          {responsibilities?.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="
                before:content-['']
                before:w-1
                before:h-1
                before:rounded-full
                before:bg-slate-500
                before:mt-[0.875rem]
                before:block" />
              <p className="text-sm leading-8">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export {Experience};