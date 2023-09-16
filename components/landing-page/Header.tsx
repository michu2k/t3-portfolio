import React from "react";
import Link from "next/link";
import Image from "next/image";

const image = "https://picsum.photos/id/821/4403/2476";

const Header = () => {
  return (
    <header id="top" className="px-4 pb-16 pt-10 md:px-6">
      <div className="section-container flex min-h-[34rem] flex-col items-start justify-center">
        <div className="mb-8 flex w-full flex-col gap-8 md:flex-row md:items-center">
          <div className="relative my-auto flex h-28 w-28 items-center justify-center after:absolute after:-left-2 after:-top-2 after:-z-10 after:h-32 after:w-32 after:rounded-full after:border-8 after:border-transparent after:border-r-primary after:border-t-primary">
            <div className="relative h-28 w-28 overflow-hidden rounded-full bg-slate-100">
              <Image src={image} fill alt="" style={{objectFit: "cover"}} />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 lg:text-6xl">Hi! I&apos;m Allison</h1>
        </div>

        <p className="text-md mb-12 max-w-3xl leading-8">
          Full-time <strong>JavaScript</strong> developer specialized in creating dynamic and user-friendly web
          applications using modern techniques and tools.
        </p>

        <Link
          href="#keep-in-touch"
          className="text-md inline-flex h-12 items-center rounded-full bg-primary px-12 font-semibold text-white transition-colors hover:bg-slate-700">
          Let&apos;s talk
        </Link>
      </div>
    </header>
  );
};

export {Header};
