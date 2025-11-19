import * as React from "react";
import { type ContactMethod, SnippetType } from "@prisma/client";

import { MotionInViewWrapper } from "~/components/ui/motion-in-view-wrapper";
import type { Snippets } from "~/server/api/routers/snippet";
import { api } from "~/trpc/server";
import { extractSnippetValues } from "~/utils/extract-snippet-values";
import { getContactIcon } from "~/utils/get-contact-icon";

import { PageSection } from "./page-section";

type ContactProps = {
  snippets: Snippets;
};

export const Contact = async ({ snippets }: ContactProps) => {
  const contactMethods = await api.contact.getItems();
  const { description = "" } = extractSnippetValues<typeof SnippetType.CONTACT>(snippets);

  function displayContactItems() {
    return contactMethods.map((item) => <ContactMethodListItem key={item.id} {...item} />);
  }

  return (
    <PageSection id="contact" heading="Get In Touch" subheading="Contact">
      <p className="text-muted-foreground mb-12 max-w-2xl text-base leading-7">{description}</p>
      <ul className="flex flex-col gap-8">{displayContactItems()}</ul>
    </PageSection>
  );
};

const ContactMethodListItem = ({ name, description, type }: ContactMethod) => {
  const Icon = getContactIcon(type);

  return (
    <li className="group flex items-center">
      <MotionInViewWrapper className="flex items-center gap-6">
        <Icon className="fill-accent-foreground group-hover:fill-primary size-5 transition-colors" />

        <div className="flex-1">
          <p className="font-poppins text-foreground text-base leading-7 font-semibold">{name}</p>
          <p className="text-muted-foreground text-sm leading-7">{description}</p>
        </div>
      </MotionInViewWrapper>
    </li>
  );
};
