import React from "react";
import Link from "next/link";
import Image from "next/image";

const image = "https://picsum.photos/id/821/4403/2476";

const Header = () => {
  return (
    <header id="top" className="pt-10 pb-16 px-4 md:px-6">
      <div className="section-container min-h-[34rem] flex flex-col justify-center items-start">
        <div className="flex flex-col md:flex-row md:items-center gap-8 mb-8 w-full">
          <div className="
            w-28 h-28 my-auto
            flex items-center justify-center
            relative
            after:absolute
            after:border-8
            after:border-transparent
            after:border-t-primary
            after:border-r-primary
            after:rounded-full
            after:w-32
            after:h-32
            after:-top-2
            after:-left-2
            after:-z-10">
            <div className="
              w-28 h-28
              rounded-full
              bg-slate-100
              overflow-hidden relative">
              <Image src={image} fill alt="" style={{objectFit: "cover"}} />
            </div>
          </div>

          <h1 className="font-bold text-4xl lg:text-6xl text-slate-900">
            Hi! I&apos;m Allison
          </h1>
        </div>

        <p className="text-md leading-8 max-w-3xl mb-12">
          Full-time <strong>JavaScript</strong> developer
          specialized in creating dynamic and user-friendly web applications using modern techniques and tools.
        </p>

        <Link
          href="#keep-in-touch"
          className="
            h-12 px-12
            inline-flex items-center
            rounded-full
            text-md font-semibold text-white
            bg-primary
            hover:bg-slate-700
            transition-colors">
          Let&apos;s talk
        </Link>
      </div>
    </header>
  );
};

export {Header};