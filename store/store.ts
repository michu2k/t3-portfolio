import { configureStore } from "@reduxjs/toolkit";

export const reduxStore = () =>
  configureStore({
    reducer: {
      // There are no reducers yet, so we just add a placeholder
      example: () => null
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  });

export type AppStore = ReturnType<typeof reduxStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
