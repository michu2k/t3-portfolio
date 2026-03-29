import React from "react";

import type { SocialMediaLink } from "~/prisma/generated/client";
import { api } from "~/trpc/server";
import { capitalize } from "~/utils/capitalize";
import { cn } from "~/utils/cn";
import { getSocialMediaIcon, isSocialMediaIconNameValid } from "~/utils/get-social-media-icon";

type SocialMediaProps = {
  className?: string;
};

export const SocialMedia = async ({ className }: SocialMediaProps) => {
  const socialMediaItems = await api.socialMedia.getItems();

  function displaySocialMediaIcons() {
    return socialMediaItems
      .filter(({ icon }) => isSocialMediaIconNameValid(icon))
      .map((item) => <SocialMediaItem key={item.id} {...item} />);
  }

  return (
    <ul className={cn("flex items-center gap-4", className)} aria-label="Social media">
      {displaySocialMediaIcons()}
    </ul>
  );
};

const SocialMediaItem = ({ icon, url }: SocialMediaLink) => {
  const Icon = getSocialMediaIcon(icon);

  return (
    <li>
      <a
        href={url}
        className="group focus-visible:ring-appearance flex size-6 items-center justify-center rounded-sm focus-visible:ring-2 focus-visible:outline-none"
        rel="noopener noreferrer"
        target="_blank">
        <Icon
          className="fill-foreground group-hover:fill-accent-foreground group-focus:fill-accent-foreground size-4 transition-colors"
          aria-hidden="true"
        />
        <span className="sr-only">{capitalize(icon)}</span>
      </a>
    </li>
  );
};
