import React, {memo} from "react";
import {cn} from "~/utils/className";
import {capitalize} from "~/utils/capitalize";
import {getSocialMediaIcon} from "~/utils/getSocialMediaIcons";

const socialMedia: Array<SocialMediaItemProps> = [
  {
    icon: "github",
    url: "https://github.com/"
  },
  {
    icon: "linkedIn",
    url: "https://www.linkedin.com/"
  },
  {
    icon: "twitter",
    url: "https://twitter.com/"
  },
  {
    icon: "instagram",
    url: "https://www.instagram.com/"
  }
];

type SocialMediaProps = {
  className?: string;
};

const SocialMedia = memo(({className}: SocialMediaProps) => {
  function displaySocialMediaIcons() {
    return socialMedia.map((item, idx) => <SocialMediaItem key={idx} {...item} />);
  }

  return (
    <ul className={cn("flex items-center gap-4", className)} aria-label="Social media">
      {displaySocialMediaIcons()}
    </ul>
  );
});

SocialMedia.displayName = "SocialMedia";

type SocialMediaItemProps = {
  icon: string;
  url: string;
};

const SocialMediaItem = ({icon, url}: SocialMediaItemProps) => {
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
