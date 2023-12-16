import {type NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import {useRouter} from "next/router";
import {GlobeIcon} from "lucide-react";

import {api} from "~/utils/api";
import {Heading} from "~/components/ui/Heading";
import {buttonVariants} from "~/components/ui/Button";
import {Footer} from "~/components/landing-page/Footer";
import {Navigation} from "~/components/landing-page/Navigation";
import {Separator} from "~/components/ui/Separator";
import {cn} from "~/utils/className";
import GithubSvg from "~/public/svgs/socialMedia/github.svg";

const Page: NextPage = () => {
  const {query} = useRouter();
  const itemId = query.id as string;

  const {data} = api.project.getItem.useQuery({id: itemId});

  console.log({data});

  const {name, image, description} = data || {};
  const githubUrl = "";
  // const websiteUrl = "";

  return (
    <>
      <Head>
        <title>T3 Portfolio: {name}</title>
      </Head>

      <main className="mx-auto min-h-full">
        <Navigation />

        <header id="top" className="px-4 pb-14 pt-10 md:px-6">
          <div className="section-container flex min-h-[6rem] flex-col items-start justify-center gap-8 md:min-h-[10rem] lg:min-h-[12rem]">
            <h1 className="font-poppins text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">{name}</h1>
          </div>
        </header>

        <section className="px-4 pb-16 md:px-6 md:pb-24">
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
                  <Heading as="h2" size="lg" className="mb-4">
                    Description
                  </Heading>

                  <p className="whitespace-pre-wrap text-sm leading-7">{description}</p>
                </div>

                <Separator />

                <div className="mx-auto flex w-full gap-4 py-10">
                  <a
                    href={githubUrl}
                    className={cn(buttonVariants({variant: "primary", size: "md"}), "max-w-[12rem] flex-1 gap-3 px-8")}
                    target="_blank"
                    rel="noopener noreferrer">
                    <GlobeIcon className="h-4 w-4" aria-hidden="true" />
                    Website
                  </a>

                  <a
                    href={githubUrl}
                    className={cn(buttonVariants({variant: "outline", size: "md"}), "max-w-[12rem] flex-1 gap-3 px-8")}
                    target="_blank"
                    rel="noopener noreferrer">
                    <GithubSvg className="h-4 w-4" aria-hidden="true" />
                    Github
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Page;
