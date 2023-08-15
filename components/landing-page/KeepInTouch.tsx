import React from "react";
import {PageSection} from "~/components/ui/PageSection";
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
    <PageSection id="keep-in-touch" heading="Have Some Questions?" subheading="Keep in touch">
      <p className="text-md leading-7 mb-10 max-w-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </p>

      <ul className="flex flex-col gap-8">
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
    <li className="flex items-center gap-6">
      <Icon className="w-5 h-5 fill-slate-600" />

      <div className="flex-1">
        <p className="font-semibold text-md text-slate-700">{name}</p>
        <p className="text-sm">{text}</p>
      </div>
    </li>
  );
};
export {KeepInTouch};