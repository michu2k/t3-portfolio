import React from "react";
import {type ContactMethod, SnippetType} from "@prisma/client";

import {MotionInViewWrapper} from "~/components/ui/motion-in-view-wrapper";
import {getSnippetData} from "~/server/getSnippetData";
import {api} from "~/trpc/server";
import {extractSnippetValues} from "~/utils/extractSnippetValues";
import {getContactIcon} from "~/utils/get-contact-icon";
import type {ContactSnippetsFormValues} from "~/utils/validations/contact";

import {PageSection} from "./page-section";

const Contact = async () => {
  const data = await getSnippetData(SnippetType.CONTACT);
  const contactMethods = await api.contact.getItems();

  const snippetValues = extractSnippetValues<keyof ContactSnippetsFormValues>(data);
  const {description = ""} = snippetValues;

  function displayContactItems() {
    return contactMethods.map((item) => <ContactMethodListItem key={item.id} {...item} />);
  }

  return (
    <PageSection id="contact" heading="Get In Touch" subheading="Contact">
      <p className="mb-12 max-w-2xl text-base leading-7 text-muted-foreground">{description}</p>
      <ul className="flex flex-col gap-8">{displayContactItems()}</ul>
    </PageSection>
  );
};

const ContactMethodListItem = ({name, description, type}: ContactMethod) => {
  const Icon = getContactIcon(type);

  return (
    <li className="group flex items-center">
      <MotionInViewWrapper className="flex items-center gap-6">
        <Icon className="h-5 w-5 fill-accent-foreground transition-colors group-hover:fill-primary" />

        <div className="flex-1">
          <p className="font-poppins text-base font-semibold leading-7 text-foreground">{name}</p>
          <p className="text-sm leading-7 text-muted-foreground">{description}</p>
        </div>
      </MotionInViewWrapper>
    </li>
  );
};

export {Contact};
