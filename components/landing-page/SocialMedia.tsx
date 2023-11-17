import React, {memo} from "react";
import {cn} from "~/utils/className";
import {capitalize} from "~/utils/capitalize";
import {getSocialMediaIcon} from "~/utils/getSocialMediaIcons";
import {api} from "~/utils/api";
import type {SocialMediaLink} from "@prisma/client";

type SocialMediaProps = {
  className?: string;
};

const SocialMedia = memo(({className}: SocialMediaProps) => {
  const {data: socialMediaItems = []} = api.socialMedia.getItems.useQuery();

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
        className="group flex h-6 w-6 items-center justify-center"
        rel="noopener noreferrer"
        target="_blank">
        <Icon
          className="h-4 w-4 fill-slate-700 transition-colors group-hover:fill-primary group-focus:fill-primary"
          aria-hidden="true"
        />
        <span className="sr-only">{capitalize(icon)}</span>
      </a>
    </li>
  );
};

export {SocialMedia};
