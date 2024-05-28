import BehanceSvg from "~/public/svgs/socialMedia/behance.svg";
import InstagramSvg from "~/public/svgs/socialMedia/instagram.svg";
import LinkedInSvg from "~/public/svgs/socialMedia/linkedin.svg";
import TwitterSvg from "~/public/svgs/socialMedia/twitter.svg";

type SocialMediaIconsKeys = keyof typeof socialMediaIconsDef;

const socialMediaIconsDef = {
  behance: BehanceSvg,
  twitter: TwitterSvg,
  linkedIn: LinkedInSvg,
  instagram: InstagramSvg
} as const;

function getSocialMediaIcon(key: string) {
  return socialMediaIconsDef[key as SocialMediaIconsKeys];
}

export {getSocialMediaIcon, socialMediaIconsDef};
