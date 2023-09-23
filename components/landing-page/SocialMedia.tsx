import React, {memo} from "react";
import GithubSvg from "~/public/svgs/socialMedia/github.svg";
import TwitterSvg from "~/public/svgs/socialMedia/twitter.svg";
import LinkedInSvg from "~/public/svgs/socialMedia/linkedin.svg";
import InstagramSvg from "~/public/svgs/socialMedia/instagram.svg";
import {cn} from "~/utils/className";
import {capitalize} from "~/utils/capitalize";

const socialMedia: Array<SocialMediaItemProps> = [
  {
    name: "github",
    url: "https://github.com/",
    icon: GithubSvg
  },
  {
    name: "linkedIn",
    url: "https://www.linkedin.com/",
    icon: LinkedInSvg
  },
  {
    name: "twitter",
    url: "https://twitter.com/",
    icon: TwitterSvg
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/",
    icon: InstagramSvg
  }
];

type SocialMediaProps = {
  className?: string;
};

const SocialMedia = memo(({className}: SocialMediaProps) => {
  function displaySocialMediaIcons() {
    return socialMedia.map((item) => <SocialMediaItem key={item.name} {...item} />);
  }

  return (
    <ul className={cn("flex items-center gap-4", className)} aria-label="Social media">
      {displaySocialMediaIcons()}
    </ul>
  );
});

SocialMedia.displayName = "SocialMedia";

type SocialMediaItemProps = {
  name: string;
  url: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const SocialMediaItem = ({name, url, icon: Icon}: SocialMediaItemProps) => {
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
        <span className="sr-only">{capitalize(name)}</span>
      </a>
    </li>
  );
};

export {SocialMedia};
