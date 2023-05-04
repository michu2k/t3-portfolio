import React from "react";
import {PageSection} from "./generics/PageSection";
import HouseSvg from "~/public/svgs/house.svg";
import PhoneSvg from "~/public/svgs/phone.svg";
import EnvelopeSvg from "~/public/svgs/envelope.svg";

const socialMedia: Array<ContactItemProps> = [
  {
    name: "Łódź, Poland",
    text: "Drewnowska 58",
    icon: HouseSvg
  },
  {
    name: "700-999-3737",
    text: "Monday to Friday 10am to 6pm",
    icon: PhoneSvg
  },
  {
    name: "contact@portfolio.com",
    text: "Send your message anytime",
    icon: EnvelopeSvg
  }
];

const KeepInTouch = () => {

  function displayContactItems() {
    return socialMedia.map((item) => (
      <ContactItem key={item.name} {...item} />
    ));
  }

  return (
    <PageSection heading="Keep in touch">
      <p className="text-md text-slate-700 leading-7">
        Lorem ipsum dolor sit amet consectetur adipisicing elit? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </p>

      <ul className="flex flex-col gap-6 mt-10">
        {displayContactItems()}
      </ul>
    </PageSection>
  );
};

type ContactItemProps = {
  name: string;
  text: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const ContactItem = ({name, icon: Icon, text}: ContactItemProps) => {
  return (
    <li className="flex items-center gap-4">
      <Icon className="w-5 h-5 fill-slate-500" />

      <div>
        <p className="font-semibold text-md text-slate-700">{name}</p>
        <p className="text-sm text-slate-500">{text}</p>
      </div>
    </li>
  );
};
export {KeepInTouch};