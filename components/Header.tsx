import React from "react";
import GithubSvg from "~/public/svgs/socialMedia/github.svg";
import TwitterSvg from "~/public/svgs/socialMedia/twitter.svg";
import LinkedInSvg from "~/public/svgs/socialMedia/linkedin.svg";
import InstagramSvg from "~/public/svgs/socialMedia/instagram.svg";
import Image from "next/image";

const image = "https://picsum.photos/id/821/4403/2476";

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
    <header className="py-14 px-4 md:px-6">
      <div className="min-h-[32rem] max-w-xl md:max-w-5xl mx-auto grid md:grid-cols-[20rem_1fr] gap-8">
        <div className="h-80 md:h-96 my-auto  bg-slate-300 rounded-lg overflow-hidden relative">
          <Image src={image} fill alt="" style={{objectFit: "cover"}} />
        </div>

        <div className="flex flex-col justify-center items-start">
          <h1 className="font-bold text-4xl lg:text-5xl mb-8">Allison Doe</h1>
          <p className="text-md text-slate-600 leading-8 max-w-xl mb-8">
          Full-time <strong className="text-slate-700">JavaScript</strong> developer
          specialized in creating dynamic and user-friendly web applications using modern techniques and tools.
          </p>

          <div className="mb-10">
            <ul className="flex gap-5" aria-label="Social media">
              {displaySocialMediaIcons()}
            </ul>
          </div>

          <a
            href="./cv.pdf"
            className="
              h-12 px-8
              inline-flex items-center
              rounded-md
              text-md font-semibold text-slate-900
              border-2 border-slate-800
              hover:text-white hover:bg-slate-800
              transition-colors"
            rel="noopener noreferrer"
            target="_blank">
            Download CV
          </a>
        </div>
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
            fill-slate-600
            group-hover:fill-primary group-focus:fill-primary
            transition-colors"
          aria-hidden="true" />
        <span className="sr-only">{name}</span>
      </a>
    </li>
  );
};
export {Header};