"use client";

import {useRef} from "react";
import {Provider} from "react-redux";

import {type AppStore, reduxStore} from "~/store/store";

function ReduxStoreProvider({children}: {children: React.ReactNode}) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = reduxStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

export {ReduxStoreProvider};
