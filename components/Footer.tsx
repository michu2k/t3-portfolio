import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="max-w-xl md:max-w-5xl mx-auto h-16 flex items-center px-4 md:px-8">
      <p className="text-xs">
        Copyright © {currentYear} Portfolio Inc.
      </p>
    </footer>
  );
};

export {Footer};