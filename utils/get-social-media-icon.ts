import BehanceSvg from "~/public/svgs/socialMedia/behance.svg";
import DefaultSvg from "~/public/svgs/socialMedia/default.svg";
import InstagramSvg from "~/public/svgs/socialMedia/instagram.svg";
import LinkedInSvg from "~/public/svgs/socialMedia/linkedin.svg";
import PinterestSvg from "~/public/svgs/socialMedia/pinterest.svg";
import TikTokSvg from "~/public/svgs/socialMedia/tiktok.svg";
import XSvg from "~/public/svgs/socialMedia/x.svg";
import YouTubeSvg from "~/public/svgs/socialMedia/youtube.svg";

type SocialMediaIconsKeys = keyof typeof socialMediaIconsDef;

export const socialMediaIconsDef = {
  behance: BehanceSvg,
  x: XSvg,
  linkedIn: LinkedInSvg,
  instagram: InstagramSvg,
  pinterest: PinterestSvg,
  tiktok: TikTokSvg,
  youtube: YouTubeSvg
} as const;


export function getSocialMediaIcon(key: string) {
  return socialMediaIconsDef[key as SocialMediaIconsKeys];
}
