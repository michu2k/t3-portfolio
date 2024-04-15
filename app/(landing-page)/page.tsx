import React from "react";
import {HomeNavigation} from "~/components/landing-page/navigation";
import {Header} from "~/components/landing-page/header";
import {AboutMe} from "~/components/landing-page/about-me";
import {Projects} from "~/components/landing-page/projects";
import {Experience} from "~/components/landing-page/experience";
import {Contact} from "~/components/landing-page/contact";
import {Footer} from "~/components/landing-page/footer";
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
