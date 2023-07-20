import React from "react";
import Link from "next/link";
import GithubSvg from "~/public/svgs/socialMedia/github.svg";
import TwitterSvg from "~/public/svgs/socialMedia/twitter.svg";
import LinkedInSvg from "~/public/svgs/socialMedia/linkedin.svg";
import InstagramSvg from "~/public/svgs/socialMedia/instagram.svg";

const navigationItems: Array<NavigationItemProps> = [
  {
    id: 1,
    href: "#about",
    text: "About"
  },
  {
    id: 2,
    href: "#recent-work",
    text: "Recent work"
  },
  {
    id: 3,
    href: "#experience",
    text: "Experience"
  },
  {
    id: 4,
    href: "#keep-in-touch",
    text: "Contact"
  }
];

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
const Navigation = () => {

  function displayNavigationItems() {
    return navigationItems.map((item) => (
      <NavigationItem key={item.id} {...item} />
    ));
  }

  function displaySocialMediaIcons() {
    return socialMedia.map((item) => (
      <SocialMediaItem key={item.name} {...item} />
    ));
  }

  return (
    <div className="
      bg-white
      px-4 md:px-6
      w-full h-20
      sticky z-20
      top-0 left-0 right-0
      mx-auto">
      <nav className="
        flex items-center justify-between
        w-full max-w-xl md:max-w-5xl
        h-full
        mx-auto">
        <ul className="flex items-center gap-8">
          {displayNavigationItems()}
        </ul>

        <ul className="flex gap-5" aria-label="Social media">
          {displaySocialMediaIcons()}
        </ul>
      </nav>
    </div>
  );
};

type NavigationItemProps = {
  id: number;
  href: string;
  text: string;
}

const NavigationItem = ({href, text}: NavigationItemProps) => {

  return (
    <li className="text-sm text-slate-700">
      <Link href={href}>{text}</Link>
    </li>
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
        className="group flex items-center justify-center w-4 h-4"
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

export {Navigation};