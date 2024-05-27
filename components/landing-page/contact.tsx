import React from "react";
import {SnippetType, type ContactMethod} from "@prisma/client";
import {extractSnippetValues} from "~/hooks/use-snippets";
import {api} from "~/trpc/server";
import {PageSection} from "./page-section";
import type {ContactSnippetsFormValues} from "~/utils/validations/contact";
import {getContactIcon} from "~/utils/get-contact-icon";
import {getSnippetData} from "~/server/getSnippetData";

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
    <li className="group flex items-center gap-6">
      <Icon className="h-5 w-5 fill-accent-foreground transition-colors group-hover:fill-primary" />

      <div className="flex-1">
        <p className="font-poppins text-base font-semibold leading-7 text-foreground">{name}</p>
        <p className="text-sm leading-7 text-muted-foreground">{description}</p>
      </div>
    </li>
  );
};

export {Contact};
