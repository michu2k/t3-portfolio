import { configureStore } from "@reduxjs/toolkit";

import { toastReducer } from "~/reducers/toast-reducer";

export const reduxStore = () =>
  configureStore({
    reducer: {
      toast: toastReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  });

export type AppStore = ReturnType<typeof reduxStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
