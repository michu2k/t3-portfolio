import React from "react";
import {PageSection} from "./generics/PageSection";
import {SectionText} from "./generics/SectionText";
import CodeSvg from "~/public/svgs/services/code.svg";
import DesignSvg from "~/public/svgs/services/design.svg";
import WriteSvg from "~/public/svgs/services/write.svg";

const myServicesItems: Array<ServiceItemProps> = [
  {
    id: 1,
    name: "Web Development",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis veritatis similique praesentium cum.",
    icon: CodeSvg
  },
  {
    id: 2,
    name: "UX/UI Design",
    description: "Placeat alias eaque corrupti quam accusamus explicabo optio, qui recusandae expedita magni adipisci dolores.",
    icon: DesignSvg
  },
  {
    id: 3,
    name: "Content writing",
    description: " Esse nisi illo exercitationem nobis aperiam cum consequatur.",
    icon: WriteSvg
  }
];

const MyServices = () => {

  function displayServicesItems() {
    return myServicesItems.map((item) => (
      <ServiceItem key={item.id} {...item} />
    ));
  }

  return (
    <PageSection id="services" heading="What I do" className="bg-neutral-50">
      <SectionText>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti pariatur quisquam blanditiis at quo esse.
      </SectionText>

      <div className="grid md:grid-cols-3 gap-6 md:gap-4 lg:gap-6">
        {displayServicesItems()}
      </div>
    </PageSection>
  );
};

type ServiceItemProps = {
  id: number;
  name: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const ServiceItem = ({name, description, icon: Icon}: ServiceItemProps) => {
  return (
    <article className="
      group
      flex flex-col items-start md:items-center shrink-0
      w-auto
      rounded
      bg-white
      py-6 md:py-10 px-4">
      <span className="
        font-bold text-lg text-slate-700
        flex items-center justify-center
        w-12 h-12 md:w-16 md:h-16
        mb-4
        rounded-full
        group-hover:bg-primary
        transition-colors">
        <Icon className="w-5 h-5 md:w-8 md:h-8 fill-primary group-hover:fill-white transition-colors" />
      </span>

      <h3 className="font-semibold text-lg inline-flex mb-4">
        {name}
      </h3>

      <p className="text-sm md:text-center inline-flex rounded-sm leading-7">
        {description}
      </p>
    </article>
  );
};

export {MyServices};