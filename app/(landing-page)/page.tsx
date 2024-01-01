import React from "react";
import {Navigation} from "~/components/landing-page/navigation";
import {Header} from "~/components/landing-page/header";
import {AboutMe} from "~/components/landing-page/about-me";
import {RecentWork} from "~/components/landing-page/recent-work";
import {Experience} from "~/components/landing-page/experience";
import {KeepInTouch} from "~/components/landing-page/keep-in-touch";
import {Footer} from "~/components/landing-page/footer";
import {Separator} from "~/components/ui/separator";
import {SocialMedia} from "~/components/landing-page/social-media";

export default function Page() {
  return (
    <>
      <Navigation>
        <SocialMedia />
      </Navigation>
      <Header />
      <Separator />
      <AboutMe />
      <Separator />
      <RecentWork />
      <Separator />
      <Experience />
      <Separator />
      <KeepInTouch />
      <Footer />
    </>
  );
}
