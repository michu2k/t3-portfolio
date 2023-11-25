import React from "react";
import {cn} from "~/utils/className";

type FooterProps = {
  className?: string;
};

const Footer = ({className}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 md:px-6">
      <div className={cn("section-container flex h-20 items-center", className)}>
        <p className="text-xs">Copyright © {currentYear} Portfolio Inc.</p>
      </div>
    </footer>
  );
};

export {Footer};
