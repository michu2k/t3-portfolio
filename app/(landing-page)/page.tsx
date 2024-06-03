import React from "react";

import {AboutMe} from "~/components/landing-page/about-me";
import {Contact} from "~/components/landing-page/contact";
import {Experience} from "~/components/landing-page/experience";
import {Footer} from "~/components/landing-page/footer";
import {Header} from "~/components/landing-page/header";
import {HomeNavigation} from "~/components/landing-page/navigation";
import {Projects} from "~/components/landing-page/projects";
import {SocialMedia} from "~/components/landing-page/social-media";
import {api} from "~/trpc/server";

export default async function Page() {
  const snippets = await api.snippet.getAllSnippets();

  return (
    <>
      <HomeNavigation>
        <SocialMedia />
      </HomeNavigation>
      <Header snippets={snippets.HEADER} />
      <AboutMe snippets={snippets.ABOUT_ME} />
      <Projects />
      <Experience />
      <Contact snippets={snippets.CONTACT} />
      <Footer />
    </>
  );
}
