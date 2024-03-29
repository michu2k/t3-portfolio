import React from "react";
import type {Metadata} from "next";
import Image from "next/image";
import {CodeIcon, GlobeIcon} from "lucide-react";
import {api} from "~/trpc/server";
import {SubpageNavigation} from "~/components/landing-page/navigation";
import {SocialMedia} from "~/components/landing-page/social-media";
import {Footer} from "~/components/landing-page/footer";
import {Heading} from "~/components/ui/heading";
import {Button} from "~/components/ui/button";
import {Separator} from "~/components/ui/separator";

type MetadataProps = {
  params: {id: string};
};

export async function generateMetadata({params: {id}}: MetadataProps): Promise<Metadata> {
  const data = await api.project.getItem.query({id});

  return {
    title: `T3 Portfolio: ${data?.name}`
  };
}

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({params: {id}}: PageProps) {
  const data = await api.project.getItem.query({id});
  const {name, image, description, repositoryUrl, websiteUrl} = data || {};

  return (
    <>
      <SubpageNavigation>
        <SocialMedia />
      </SubpageNavigation>

      <header id="top" className="px-4 pb-14 pt-10 md:px-6">
        <div className="section-container flex min-h-[8rem] flex-col items-start justify-center gap-2 md:min-h-[10rem] lg:min-h-[12rem]">
          <p className="font-poppins text-xl font-semibold leading-8 text-primary">Project</p>
          <h1 className="font-poppins text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">{name}</h1>
        </div>
      </header>

      <Separator />

      <section className="px-4 py-20 md:px-6 md:py-28">
        <div className="section-container">
          <div className="flex flex-col gap-12 md:flex-row">
            <div className="h-fit w-full shrink-0 md:w-1/2">
              {image && (
                <Image
                  src={image.url}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="rounded-lg border border-solid border-slate-200"
                  style={{width: "100%", height: "auto"}}
                  alt=""
                />
              )}
            </div>

            <div className="w-full md:flex-1">
              <div className="pb-14">
                <Heading as="h2" size="lg" className="pb-6">
                  Description
                </Heading>

                <p className="whitespace-pre-wrap text-justify text-sm leading-7 text-muted-foreground">
                  {description}
                </p>
              </div>

              <div className="mx-auto flex w-full gap-4">
                {websiteUrl ? (
                  <Button className="max-w-[12rem] flex-1 gap-3 px-8" asChild>
                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                      <GlobeIcon className="h-4 w-4" />
                      Website
                    </a>
                  </Button>
                ) : null}

                {repositoryUrl ? (
                  <Button variant="outline" className="max-w-[12rem] flex-1 gap-3 px-8" asChild>
                    <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
                      <CodeIcon className="h-4 w-4" />
                      Repository
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
