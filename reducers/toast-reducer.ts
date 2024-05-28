import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";

import {TOAST_LIMIT, type ToasterToast} from "~/hooks/use-toast";

type ToastState = {
  toasts: Array<ToasterToast>;
};

const initialState: ToastState = {
  toasts: []
};

const toastSlice = createSlice({
  name: "TOST",
  initialState,
  reducers: {
    addToast: (state: ToastState, action: PayloadAction<ToasterToast>) => {
      state.toasts = [action.payload, ...state.toasts].slice(0, TOAST_LIMIT);
    },
    updateToast: (state: ToastState, action: PayloadAction<ToasterToast>) => {
      state.toasts = state.toasts.map((t) => (t.id === action.payload.id ? {...t, ...action.payload} : t));
    },
    removeToast: (state, action: PayloadAction<number>) => {
      const toastId = action.payload;
      state.toasts = state.toasts.filter(({id}) => id !== toastId);
    }
  }
});

const toastReducer = toastSlice.reducer;
const {addToast, updateToast, removeToast} = toastSlice.actions;

export {toastReducer, addToast, updateToast, removeToast};
