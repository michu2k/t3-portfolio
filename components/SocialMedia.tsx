import React from "react";
import GithubSvg from "~/public/svgs/socialMedia/github.svg";
import TwitterSvg from "~/public/svgs/socialMedia/twitter.svg";
import LinkedInSvg from "~/public/svgs/socialMedia/linkedin.svg";
import InstagramSvg from "~/public/svgs/socialMedia/instagram.svg";

const socialMedia: Array<SocialMediaItemProps> = [
  {
    name: "Github",
    url: "https://github.com/",
    icon: GithubSvg
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/",
    icon: LinkedInSvg
  },
  {
    name: "Twitter",
    url: "https://twitter.com/",
    icon: TwitterSvg
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/",
    icon: InstagramSvg
  }
];

const SocialMedia = () => {
  function displaySocialMediaIcons() {
    return socialMedia.map((item) => (
      <SocialMediaItem key={item.name} {...item} />
    ));
  }

  return (
    <ul className="flex gap-4" aria-label="Social media">
      {displaySocialMediaIcons()}
    </ul>
  );
};

type SocialMediaItemProps = {
  name: string;
  url: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const SocialMediaItem = ({name, url, icon: Icon}: SocialMediaItemProps) => {
  return (
    <li>
      <a
        href={url}
        className="group flex items-center justify-center w-6 h-6"
        rel="noopener noreferrer"
        target="_blank">
        <Icon
          className="
            w-4 h-4
            fill-slate-700
            group-hover:fill-primary group-focus:fill-primary
            transition-colors"
          aria-hidden="true" />
        <span className="sr-only">{name}</span>
      </a>
    </li>
  );
};

export {SocialMedia};