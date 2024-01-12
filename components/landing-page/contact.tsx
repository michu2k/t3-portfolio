import React from "react";
import type {ContactMethod} from "@prisma/client";
import {getSnippetValues} from "~/hooks/use-snippets";
import {api} from "~/trpc/server";
import {PageSection} from "./page-section";
import type {ContactSnippetsFormValues} from "~/utils/validations/contact";
import {getContactIcon} from "~/utils/get-contact-icon";

const Contact = async () => {
  const data = await api.snippet.getSnippets.query({type: "CONTACT", keys: ["description"]});
  const contactMethods = await api.contact.getItems.query();

  const snippetValues = getSnippetValues<keyof ContactSnippetsFormValues>(data);
  const {description = ""} = snippetValues;

  function displayContactItems() {
    return contactMethods.map((item) => <ContactMethodListItem key={item.id} {...item} />);
  }

  return (
    <PageSection id="contact" heading="Get In Touch" subheading="04. Contact">
      <p className="text-md mb-10 max-w-2xl leading-7">{description}</p>
      <ul className="flex flex-col gap-8">{displayContactItems()}</ul>
    </PageSection>
  );
};

const ContactMethodListItem = ({name, description, type}: ContactMethod) => {
  const Icon = getContactIcon(type);

  return (
    <li className="group flex items-center gap-6">
      <Icon className="h-6 w-6 fill-slate-600 transition-colors group-hover:fill-primary" />

      <div className="flex-1">
        <p className="text-md font-poppins font-semibold leading-7 text-slate-700">{name}</p>
        <p className="text-sm leading-7">{description}</p>
      </div>
    </li>
  );
};

export {Contact};
