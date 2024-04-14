"use client";

import React from "react";
import {MoveRightIcon} from "lucide-react";
import {Button} from "~/components/ui/button";
import {useSmoothScroll} from "~/hooks/use-smooth-scroll";

const HeaderButton = () => {
  const scrollToTarget = useSmoothScroll("#projects");

  return (
    <Button variant="secondary" onClick={scrollToTarget} className="h-12 gap-6 px-8">
      See my work
      <MoveRightIcon size={20} />
    </Button>
  );
};

export {HeaderButton};
