import {configureStore} from "@reduxjs/toolkit";
import {toastReducer} from "~/reducers/toast-reducer";

const reduxStore = () =>
  configureStore({
    reducer: {
      toast: toastReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  });

type AppStore = ReturnType<typeof reduxStore>;
type RootState = ReturnType<AppStore["getState"]>;
type AppDispatch = AppStore["dispatch"];

export type {AppStore, RootState, AppDispatch};

export {reduxStore};
