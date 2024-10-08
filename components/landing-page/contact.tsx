import React from "react";
import {type ContactMethod} from "@prisma/client";

import {MotionInViewWrapper} from "~/components/ui/motion-in-view-wrapper";
import type {Snippets} from "~/server/api/routers/snippet";
import {api} from "~/trpc/server";
import {extractSnippetValues} from "~/utils/extract-snippet-values";
import {getContactIcon} from "~/utils/get-contact-icon";
import type {ContactSnippetsFormValues} from "~/utils/validations/contact";

import {PageSection} from "./page-section";

type ContactProps = {
  snippets: Snippets;
};

const Contact = async ({snippets}: ContactProps) => {
  const contactMethods = await api.contact.getItems();

  const snippetValues = extractSnippetValues<keyof ContactSnippetsFormValues>(snippets);
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
        <Icon className="size-5 fill-accent-foreground transition-colors group-hover:fill-primary" />

        <div className="flex-1">
          <p className="font-poppins text-base font-semibold leading-7 text-foreground">{name}</p>
          <p className="text-sm leading-7 text-muted-foreground">{description}</p>
        </div>
      </MotionInViewWrapper>
    </li>
  );
};

export {Contact};
