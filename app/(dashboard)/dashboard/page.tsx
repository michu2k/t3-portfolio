import React from "react";
import type {Metadata} from "next";
import type {LucideIcon} from "lucide-react";
import {CodeIcon, BookTextIcon, RocketIcon} from "lucide-react";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {buttonVariants} from "~/components/ui/button";
import {cn} from "~/utils/className";
import {Heading} from "~/components/ui/heading";

const projectLinks: Array<UsefulLinkDef> = [
  {
    id: "github-repo",
    text: "Repository",
    description: "View the source code on GitHub",
    href: "https://github.com/michu2k/t3-stack-portfolio-website",
    icon: CodeIcon
  },
  {
    id: "documentation",
    text: "Documentation",
    description: "Learn how to configure the project",
    href: "https://github.com/michu2k/t3-stack-portfolio-website/blob/master/README.md",
    icon: BookTextIcon
  },
  {
    id: "releases",
    text: "Releases",
    description: "View the latest releases",
    href: "https://github.com/michu2k/t3-stack-portfolio-website/releases",
    icon: RocketIcon
  }
];

export const metadata: Metadata = {
  title: "Dashboard: General"
};

export default function Page() {
  function displayLinks() {
    return projectLinks.map((item) => <LinkCard key={item.id} {...item} />);
  }

  return (
    <>
      <PageHeader heading="General" description="Dashboard home page" />
      <PageContent>
        <Heading as="h2" size="sm">
          Introduction
        </Heading>

        <p className="text-muted-foreground pb-8 text-sm leading-7">
          Welcome to the portfolio management dashboard. This is an open-source simple dashboard for your website
          bootstraped with <span className="rounded bg-slate-100 px-1.5 py-0.5">create-t3-app</span>. Use the links in
          the sidebar to navigate to the section you want to manage.
        </p>

        <Heading as="h2" size="sm">
          Quick Access
        </Heading>

        <p className="text-muted-foreground pb-4 text-sm leading-7">
          If you want to learn more about the project, check out the links below.
        </p>

        <ul className="grid gap-3 pt-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">{displayLinks()}</ul>
      </PageContent>
    </>
  );
}

type UsefulLinkDef = {
  id: string;
  text: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

const LinkCard = ({text, description, icon: Icon, href}: UsefulLinkDef) => {
  return (
    <li className="group flex">
      <a
        href={href}
        className={cn(buttonVariants({variant: "outline", size: "md"}), "h-20 flex-1 justify-start gap-4")}
        target="_blank"
        rel="noopener noreferrer">
        <Icon size={24} className="text-foreground transition-colors group-hover:text-primary" />
        <span className="flex flex-col gap-1">
          <span className="text-foreground text-sm">{text}</span>
          <span className="text-muted-foreground font-sans text-xs font-normal">{description}</span>
        </span>
      </a>
    </li>
  );
};
