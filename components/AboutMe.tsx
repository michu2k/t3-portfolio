import React from "react";
import {PageSection} from "./generics/PageSection";

const AboutMe = () => {
  return (
    <PageSection upperHeading="About Me" heading="JavaScript developer & UI designer">
      <p className="text-md text-slate-600 leading-7">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Nihil incidunt accusamus mollitia exercitationem sapiente quasi qui eligendi architecto non dolor.
        Autem consectetur et voluptatum labore accusantium magni. Laudantium quia vitae quas provident nostrum adipisci.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, voluptates.
      </p>

      <a
        href="./cv.pdf"
        className="
          h-12 px-8
          inline-flex items-center
          rounded-md
          mt-8
          text-md font-semibold text-slate-900
          border-2 border-slate-800
          hover:text-white hover:bg-slate-800
          transition-colors"
        rel="noopener noreferrer"
        target="_blank">
        Download CV
      </a>
    </PageSection>
  );
};

export {AboutMe};