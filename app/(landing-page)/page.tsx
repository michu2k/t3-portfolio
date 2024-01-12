import React from "react";
import {HomeNavigation} from "~/components/landing-page/navigation";
import {Header} from "~/components/landing-page/header";
import {AboutMe} from "~/components/landing-page/about-me";
import {Projects} from "~/components/landing-page/projects";
import {Experience} from "~/components/landing-page/experience";
import {Contact} from "~/components/landing-page/contact";
import {Footer} from "~/components/landing-page/footer";
import {Separator} from "~/components/ui/separator";
import {SocialMedia} from "~/components/landing-page/social-media";

export default function Page() {
  return (
    <>
      <HomeNavigation>
        <SocialMedia />
      </HomeNavigation>
      <Header />
      <Separator />
      <AboutMe />
      <Separator />
      <Projects />
      <Separator />
      <Experience />
      <Separator />
      <Contact />
      <Footer />
    </>
  );
}
