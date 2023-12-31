import React from "react";
import type {ContactMethod} from "@prisma/client";
import {PageSection} from "~/components/ui/page-section";
import {getSnippetValues} from "~/hooks/use-snippets";
import {api} from "~/trpc/react";
import type {ContactSnippetsFormValues} from "~/utils/validations/contact";
import {getContactIcon} from "~/utils/get-contact-icon";

const KeepInTouch = () => {
  const {data = []} = api.snippet.getSnippets.useQuery({type: "CONTACT", keys: ["description"]});
  const {data: contactMethods = []} = api.contact.getItems.useQuery();

  const snippetValues = getSnippetValues<keyof ContactSnippetsFormValues>(data);
  const {description = ""} = snippetValues;

  function displayContactItems() {
    return contactMethods.map((item) => <ContactMethodListItem key={item.id} {...item} />);
  }

  return (
    <PageSection id="keep-in-touch" heading="Have Some Questions?" subheading="04. Keep in touch">
      <p className="mb-10 max-w-2xl text-sm leading-7">{description}</p>
      <ul className="flex flex-col gap-8">{displayContactItems()}</ul>
    </PageSection>
  );
};

const ContactMethodListItem = ({name, description, type}: ContactMethod) => {
  const Icon = getContactIcon(type);

  return (
    <li className="flex items-center gap-6">
      <Icon className="h-6 w-6 fill-slate-600" />

      <div className="flex-1">
        <p className="text-md font-poppins font-semibold leading-8 text-slate-700">{name}</p>
        <p className="text-sm leading-7">{description}</p>
      </div>
    </li>
  );
};

export {KeepInTouch};
