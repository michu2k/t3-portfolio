import React from "react";

import {AboutMe} from "~/components/landing-page/about-me";
import {Contact} from "~/components/landing-page/contact";
import {Experience} from "~/components/landing-page/experience";
import {Footer} from "~/components/landing-page/footer";
import {Header} from "~/components/landing-page/header";
import {HomeNavigation} from "~/components/landing-page/navigation";
import {Projects} from "~/components/landing-page/projects";
import {SocialMedia} from "~/components/landing-page/social-media";

export default function Page() {
  return (
    <>
      <HomeNavigation>
        <SocialMedia />
      </HomeNavigation>
      <Header />
      <AboutMe />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
