import React from "react";
import {PageSection} from "./generics/PageSection";
import CodeSvg from "~/public/svgs/services/code.svg";
import DesignSvg from "~/public/svgs/services/design.svg";
import WriteSvg from "~/public/svgs/services/write.svg";

const myServicesItems: Array<ServiceItemProps> = [
  {
    id: 1,
    name: "Web Development",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
    icon: CodeSvg
  },
  {
    id: 2,
    name: "UX/UI Design",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
    icon: DesignSvg
  },
  {
    id: 3,
    name: "Content writing",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
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
    <PageSection heading="What I do">
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
      flex flex-col items-center shrink-0
      w-auto
      rounded
      bg-neutral-50
      py-8 px-4">
      <span className="
        font-bold text-lg text-slate-700
        flex items-center justify-center
        w-20 h-20
        mb-5
        rounded-full
        bg-neutral-100">
        <Icon className="w-8 h-8 fill-slate-500 group-hover:fill-primary transition-colors" />
      </span>

      <h3 className="font-semibold text-md inline-flex mb-4">
        {name}
      </h3>

      <p className="text-sm text-center inline-flex rounded-sm leading-6 text-slate-600">
        {description}
      </p>

      <button className="
        font-medium text-sm text-slate-900
        mt-6 h-8 px-2
        border-b-2 border-slate-800
        group-hover:border-primary transition-colors">
        Learn more
      </button>
    </article>
  );
};

export {MyServices};