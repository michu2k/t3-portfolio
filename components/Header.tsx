import React from "react";
import GithubSvg from "~/public/svgs/socialMedia/github.svg";
import TwitterSvg from "~/public/svgs/socialMedia/twitter.svg";
import LinkedInSvg from "~/public/svgs/socialMedia/linkedin.svg";
import InstagramSvg from "~/public/svgs/socialMedia/instagram.svg";
import Link from "next/link";

const socialMedia: Array<SocialMediaItemProps> = [
  {
    name: "Github",
    url: "https://github.com/",
    icon: GithubSvg
  },
  {
    name: "Twitter",
    url: "https://twitter.com/",
    icon: TwitterSvg
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/",
    icon: LinkedInSvg
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/",
    icon: InstagramSvg
  }
];

const Header = () => {

  function displaySocialMediaIcons() {
    return socialMedia.map((item) => (
      <SocialMediaItem key={item.name} {...item} />
    ));
  }

  return (
    <header id="top" className="py-14 px-4 md:px-6">
      <div className="min-h-[34rem] max-w-xl md:max-w-5xl mx-auto flex flex-col justify-center items-start">
        <h1 className="font-bold text-4xl lg:text-6xl text-slate-900 mb-8">Hi! I&apos;m Allison</h1>
        <p className="text-md leading-8 max-w-3xl mb-12">
          Full-time <strong>JavaScript</strong> developer
          specialized in creating dynamic and user-friendly web applications using modern techniques and tools.
        </p>

        <div className="flex gap-4 mb-16">
          <a
            href="./cv.pdf"
            className="
              h-12 px-6
              inline-flex items-center
              rounded-md
              text-md font-semibold text-white
              bg-primary
              hover:bg-slate-700
              transition-colors"
            rel="noopener noreferrer"
            target="_blank">
            Download CV
          </a>

          <Link
            href="#keep-in-touch"
            className="
              h-12 px-6
              inline-flex items-center
              rounded-md
              text-md font-semibold text-primary
              border-2 border-primary
              hover:text-white hover:bg-primary
              transition-colors">
              Let&apos;s talk
          </Link>
        </div>

        <ul className="flex gap-5" aria-label="Social media">
          {displaySocialMediaIcons()}
        </ul>
      </div>
    </header>
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
            w-5 h-5
            fill-slate-700
            group-hover:fill-primary group-focus:fill-primary
            transition-colors"
          aria-hidden="true" />
        <span className="sr-only">{name}</span>
      </a>
    </li>
  );
};
export {Header};