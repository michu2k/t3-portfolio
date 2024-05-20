import React, {memo} from "react";
import type {SocialMediaLink} from "@prisma/client";
import {api} from "~/trpc/server";
import {cn} from "~/utils/className";
import {capitalize} from "~/utils/capitalize";
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
        className="group flex h-6 w-6 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
        rel="noopener noreferrer"
        target="_blank">
        <Icon
          className="h-4 w-4 fill-foreground transition-colors group-hover:fill-accent-foreground group-focus:fill-accent-foreground"
          aria-hidden="true"
        />
        <span className="sr-only">{capitalize(icon)}</span>
      </a>
    </li>
  );
};

export {SocialMedia};
