import {useLayoutEffect, useState} from "react";
import {debounce} from "~/utils/debounce";
import {isClientSide} from "~/utils/isClientSide";

type WindowSize = {
  width: number;
  height: number;
}

const useWindowSize = (debounceMs = 100) => {
  const [windowSize, setWindowSize] = useState<WindowSize>(getSize);

  function getSize() {
    return {
      width: isClientSide() ? window.innerWidth : 0,
      height: isClientSide() ? window.innerHeight : 0
    };
  }

  useLayoutEffect(() => {
    function handleWindowResize() {
      debounce(() => setWindowSize(getSize()), 100)();
    }

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [debounceMs]);

  return windowSize;
};

export {useWindowSize};