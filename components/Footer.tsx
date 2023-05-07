import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="max-w-xl md:max-w-4xl mx-auto h-16 flex items-center">
      <p className="text-slate-500 text-sm">
        Copyright © {currentYear} Portfolio Inc.
      </p>
    </footer>
  );
};

export {Footer};