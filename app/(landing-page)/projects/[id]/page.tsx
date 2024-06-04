import React from "react";
import {GlobeIcon} from "lucide-react";
import type {Metadata} from "next";
import Image from "next/image";
import {notFound} from "next/navigation";

import {Footer} from "~/components/landing-page/footer";
import {SubpageNavigation} from "~/components/landing-page/navigation";
import {SocialMedia} from "~/components/landing-page/social-media";
import {Button} from "~/components/ui/button";
import {Heading} from "~/components/ui/heading";
import {MotionInViewWrapper} from "~/components/ui/motion-in-view-wrapper";
import {api} from "~/trpc/server";

type MetadataProps = {
  params: {id: string};
};

export async function generateMetadata({params: {id}}: MetadataProps): Promise<Metadata> {
  const data = await api.project.getItem({id});

  if (data) {
    return {
      title: `T3 Portfolio: ${data.name}`
    };
  }

  return {
    title: "T3 Portfolio: Page not found"
  };
}

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({params: {id}}: PageProps) {
  const data = await api.project.getItem({id});

  if (!data) {
    notFound();
  }

  const {name, image, description, websiteUrl} = data || {};

  return (
    <>
      <SubpageNavigation>
        <SocialMedia />
      </SubpageNavigation>

      <header id="top" className="px-4 py-10 md:px-6 md:py-14">
        <MotionInViewWrapper className="section-container flex min-h-[8rem] flex-col items-start justify-center gap-2 md:min-h-[10rem] lg:min-h-[12rem]">
          <h1 className="font-poppins text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">{name}</h1>
        </MotionInViewWrapper>
      </header>

      <section className="px-4 py-20 md:px-6 md:py-24">
        <div className="section-container">
          <div className="flex flex-col gap-14 md:flex-row md:gap-12">
            {image && (
              <MotionInViewWrapper transition={{delay: 0.5}} className="h-fit w-full shrink-0 md:w-1/2">
                <Image
                  src={image.url}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="bg-accent"
                  style={{width: "100%", height: "auto"}}
                  alt=""
                />
              </MotionInViewWrapper>
            )}

            <MotionInViewWrapper className="w-full md:flex-1">
              <Heading as="h2" size="2xl" className="pb-14">
                Description
              </Heading>

              <p className="whitespace-pre-wrap pb-14 text-justify text-sm leading-7 text-muted-foreground">
                {description}
              </p>

              <div className="mx-auto flex w-full gap-4">
                {websiteUrl ? (
                  <Button variant="secondary" className="max-w-[14rem] flex-1 gap-3 px-8" asChild>
                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                      <GlobeIcon className="h-4 w-4" />
                      Project website
                    </a>
                  </Button>
                ) : null}
              </div>
            </MotionInViewWrapper>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
