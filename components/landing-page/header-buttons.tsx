"use client";

import React from "react";
import {MoveRightIcon, SendIcon} from "lucide-react";

import {Button} from "~/components/ui/button";
import {MotionInViewWrapper} from "~/components/ui/motion-in-view-wrapper";
import {useSmoothScroll} from "~/hooks/use-smooth-scroll";

const HeaderButtons = () => {
  const scrollToProjects = useSmoothScroll("#projects");
  const scrollToContact = useSmoothScroll("#contact");

  return (
    <MotionInViewWrapper transition={{delay: 0.4}} className="flex gap-4">
      <Button variant="secondary" onClick={scrollToProjects} className="group h-12 gap-4 rounded-none px-6">
        See my work
        <MoveRightIcon size={20} className="transition-transform group-hover:translate-x-2" />
      </Button>

      <Button variant="ghost" onClick={scrollToContact} className="h-12 gap-4 rounded-none px-6 text-foreground">
        Contact
        <SendIcon size={20} />
      </Button>
    </MotionInViewWrapper>
  );
};

export {HeaderButtons};
