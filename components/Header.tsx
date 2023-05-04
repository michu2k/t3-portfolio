import React from "react";
import GithubSvg from "~/public/svgs/github.svg";
import TwitterSvg from "~/public/svgs/twitter.svg";
import LinkedInSvg from "~/public/svgs/linkedin.svg";

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
  }
];

const Header = () => {

  function displaySocialMediaIcons() {
    return socialMedia.map((item) => (
      <SocialMediaItem key={item.name} {...item} />
    ));
  }

  return (
    <header className="py-10 px-4 md:px-8">
      <div className="max-w-xl md:max-w-4xl mx-auto grid md:grid-cols-[320px_1fr] gap-8">
        <div className="h-64 md:h-96 bg-slate-300 rounded-lg overflow-hidden">
          {/* <Image /> */}
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="font-bold text-3xl md:text-4xl mb-5">Hi! I am John Doe</h1>
          <p className="text-md text-slate-700 leading-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
          Nihil incidunt accusamus mollitia exercitationem sapiente quasi.
          </p>

          <div className="mt-10">
            <h2 className="font-semibold text-lg mb-5">Social Media</h2>

            <ul className="flex gap-4">
              {displaySocialMediaIcons()}
            </ul>
          </div>
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
        className="flex items-center justify-center w-6 h-6 md:w-5 md:h-5"
        rel="noopener noreferrer"
        target="_blank">
        <Icon className="w-6 h-6 md:w-5 md:h-5 fill-slate-500" />
        <span className="sr-only">{name}</span>
      </a>
    </li>
  );
};

export {Header};