import React from "react";
import {PageSection} from "./generics/PageSection";
import HouseSvg from "~/public/svgs/contact/house.svg";
import PhoneSvg from "~/public/svgs/contact/phone.svg";
import EnvelopeSvg from "~/public/svgs/contact/envelope.svg";

const socialMedia: Array<ContactItemProps> = [
  {
    id: "address",
    name: "Łódź, Poland",
    text: "Drewnowska 58",
    icon: HouseSvg
  },
  {
    id: "phone",
    name: "700-999-3737",
    text: "Monday to Friday 10am to 6pm",
    icon: PhoneSvg
  },
  {
    id: "email",
    name: "contact@portfolio.com",
    text: "Send your message anytime",
    icon: EnvelopeSvg
  }
];

const KeepInTouch = () => {

  function displayContactItems() {
    return socialMedia.map((item) => (
      <ContactItem key={item.id} {...item} />
    ));
  }

  return (
    <PageSection upperHeading="Contact" heading="Keep in touch">
      <p className="text-md text-slate-600 leading-7">
        Lorem ipsum dolor sit amet consectetur adipisicing elit? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </p>

      <ul className="flex flex-col gap-8 mt-10">
        {displayContactItems()}
      </ul>
    </PageSection>
  );
};

type ContactItemProps = {
  id: string;
  name: string | React.ReactElement;
  text: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const ContactItem = ({name, icon: Icon, text}: ContactItemProps) => {
  return (
    <li className="flex items-center gap-4">
      <Icon className="w-5 h-5 fill-slate-500" />

      <div className="flex-1">
        <p className="font-semibold text-md text-slate-700">{name}</p>
        <p className="text-sm text-slate-600">{text}</p>
      </div>
    </li>
  );
};
export {KeepInTouch};