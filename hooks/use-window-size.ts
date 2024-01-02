import {useEffect, useState} from "react";
import {debounce} from "~/utils/debounce";

type WindowSize = {
  width: number;
  height: number;
};

const useWindowSize = (debounceMs = 100) => {
  const [windowSize, setWindowSize] = useState<WindowSize>(getSize());

  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  useEffect(() => {
    function handleWindowResize() {
      debounce(() => setWindowSize(getSize()), 100)();
    }

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [debounceMs]);

  return windowSize;
};

export {useWindowSize};
