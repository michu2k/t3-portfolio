import * as React from "react";
import Image from "next/image";

import { MotionInViewWrapper } from "~/components/ui/motion-in-view-wrapper";
import { SnippetType } from "~/prisma/generated/enums";
import type { Snippets } from "~/server/api/routers/snippet";
import { api } from "~/trpc/server";
import { extractSnippetValues } from "~/utils/extract-snippet-values";

import { PageSection } from "./page-section";

type AboutMeProps = {
  snippets: Snippets;
};

export const AboutMe = async ({ snippets }: AboutMeProps) => {
  const { description = "", image: imageId } = extractSnippetValues<typeof SnippetType.ABOUT_ME>(snippets);
  const imageObj = imageId ? await api.image.getImage({ key: imageId }) : null;

  return (
    <PageSection id="about" heading="Personal Details" subheading="About Me">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-center md:gap-14">
        {imageObj ? (
          <MotionInViewWrapper className="relative my-auto h-52 w-40 flex-shrink-0 sm:h-64 sm:w-52">
            <div className="relative h-full w-full overflow-hidden rounded-md">
              <Image
                src={imageObj.url}
                fill
                style={{ objectFit: "cover" }}
                className="bg-accent"
                sizes="(min-width: 768px) 50vw, 160px"
                alt=""
              />
            </div>
          </MotionInViewWrapper>
        ) : null}

        <p className="text-muted-foreground text-base leading-8">{description}</p>
      </div>
    </PageSection>
  );
};
