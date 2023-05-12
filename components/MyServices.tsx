import React from "react";
import {PageSection} from "./generics/PageSection";
import CodeSvg from "~/public/svgs/code.svg";
import DesignSvg from "~/public/svgs/design.svg";
import WriteSvg from "~/public/svgs/write.svg";

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
    return myServicesItems.map((item, idx) => (
      <ServiceItem key={item.id} {...item} />
    ));
  }

  return (
    <PageSection upperHeading="My services" heading="What I do" className="bg-stone-50">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      bg-white
      py-8 px-4">
      <span className="
        font-bold text-lg text-slate-700
        flex items-center justify-center
        w-20 h-20
        mb-5
        rounded-full
        bg-slate-100 ">
        <Icon className="w-10 h-10 fill-slate-500 group-hover:fill-primary transition-colors" />
      </span>

      <p className="font-semibold text-lg inline-flex rounded-sm text-slate-700">
        {name}
      </p>

      <hr className="shrink-0 w-12 h-px bg-slate-200 border-0 my-6" />

      <p className="text-sm text-center inline-flex rounded-sm leading-6 text-slate-600">
        {description}
      </p>

      <button className="font-medium text-sm mt-6 h-8 px-2 text-slate-700 border-b-2 border-primary">
        Learn more
      </button>
    </article>
  );
};

export {MyServices};