import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 md:px-6">
      <div className="section-container flex h-20 items-center">
        <p className="text-xs text-muted-foreground">Copyright © {currentYear} Portfolio Inc.</p>
      </div>
    </footer>
  );
};

export {Footer};
