import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 md:px-6">
      <div className="max-w-xl md:max-w-5xl mx-auto h-16 flex items-center ">
        <p className="text-xs">
          Copyright © {currentYear} Portfolio Inc.
        </p>
      </div>
    </footer>
  );
};

export {Footer};