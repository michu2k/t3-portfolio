import GithubSvg from "~/public/svgs/socialMedia/github.svg";
import TwitterSvg from "~/public/svgs/socialMedia/twitter.svg";
import LinkedInSvg from "~/public/svgs/socialMedia/linkedin.svg";
import InstagramSvg from "~/public/svgs/socialMedia/instagram.svg";

type SocialMediaIconsKeys = keyof typeof socialMediaIconsDef;

const socialMediaIconsDef = {
  github: GithubSvg,
  twitter: TwitterSvg,
  linkedIn: LinkedInSvg,
  instagram: InstagramSvg
} as const;

function getSocialMediaIcon(key: string) {
  return socialMediaIconsDef[key as SocialMediaIconsKeys];
}

export {getSocialMediaIcon, socialMediaIconsDef};
