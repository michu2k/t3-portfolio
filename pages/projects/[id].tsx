import {type NextPage} from "next";
import Head from "next/head";
import Image from "next/image";

import {useRouter} from "next/router";
import {api} from "~/utils/api";
import {Heading} from "~/components/ui/Heading";
import GithubSvg from "~/public/svgs/socialMedia/github.svg";
import {GlobeIcon} from "lucide-react";
import {cn} from "~/utils/className";
import {buttonVariants} from "~/components/ui/Button";
import {Footer} from "~/components/landing-page/Footer";
import {Navigation} from "~/components/landing-page/Navigation";
import {inter, poppins} from "../_app";

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

      <main className={`${inter.variable} ${poppins.variable} mx-auto min-h-full`}>
        <Navigation />

        <header id="top" className="px-4 pb-14 pt-10 md:px-6">
          <div className="section-container flex flex-col items-start justify-center gap-8 md:min-h-[16rem]">
            <h1 className="font-poppins text-4xl font-bold text-slate-900 md:text-5xl lg:text-6xl">{name}</h1>
          </div>
        </header>

        <section className="px-4 md:px-6">
          <div className="section-container">
            <div className="relative h-[20rem] shrink-0 overflow-hidden rounded-lg bg-slate-100 md:h-[30rem]">
              {image && (
                <Image
                  src={image.url}
                  fill
                  className="rounded"
                  style={{width: "100%", height: "100%", objectFit: "cover"}}
                  alt=""
                />
              )}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 md:px-6">
          <div className="section-container">
            <Heading as="h2" size="lg" className="mb-8">
              Description
            </Heading>
            <p className="text-md whitespace-pre-wrap leading-7">{description}</p>
          </div>
        </section>

        <section className="px-4 pb-14 md:px-6">
          <div className="section-container">
            <Heading as="h2" size="lg" className="mb-8">
              See live
            </Heading>

            <div className="mx-auto flex w-full gap-4">
              <a
                href={githubUrl}
                className={cn(buttonVariants({variant: "secondary", size: "md"}), "gap-3 px-8")}
                target="_blank"
                rel="noopener noreferrer">
                <GithubSvg className="h-4 w-4" aria-hidden="true" />
                Github
              </a>

              <a
                href={githubUrl}
                className={cn(buttonVariants({variant: "secondary", size: "md"}), "gap-3 px-8")}
                target="_blank"
                rel="noopener noreferrer">
                <GlobeIcon className="h-4 w-4" aria-hidden="true" />
                Website
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Page;
