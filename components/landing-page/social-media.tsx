import React, {memo} from "react";
import type {SocialMediaLink} from "@prisma/client";

import {api} from "~/trpc/server";
import {capitalize} from "~/utils/capitalize";
import {cn} from "~/utils/className";
import {getSocialMediaIcon} from "~/utils/get-social-media-icon";

type SocialMediaProps = {
  className?: string;
};

const SocialMedia = memo(async ({className}: SocialMediaProps) => {
  const socialMediaItems = await api.socialMedia.getItems();

  function displaySocialMediaIcons() {
    return socialMediaItems.map((item) => <SocialMediaItem key={item.id} {...item} />);
  }

  return (
    <ul className={cn("flex items-center gap-4", className)} aria-label="Social media">
      {displaySocialMediaIcons()}
    </ul>
  );
});

SocialMedia.displayName = "SocialMedia";

const SocialMediaItem = ({icon, url}: SocialMediaLink) => {
  const Icon = getSocialMediaIcon(icon);

  return (
    <li>
      <a
        href={url}
        className="group flex size-6 items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-appearance"
        rel="noopener noreferrer"
        target="_blank">
        <Icon
          className="size-4 fill-foreground transition-colors group-hover:fill-accent-foreground group-focus:fill-accent-foreground"
          aria-hidden="true"
        />
        <span className="sr-only">{capitalize(icon)}</span>
      </a>
    </li>
  );
};

export {SocialMedia};
