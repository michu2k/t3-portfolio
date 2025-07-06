import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { ToastProps } from "~/components/ui/toast";
import { TOAST_LIMIT } from "~/hooks/use-toast";

type ToasterToast = ToastProps & {
  id: number;
};

const initialState: { toasts: Array<ToasterToast> } = {
  toasts: []
};

const toastSlice = createSlice({
  name: "TOAST",
  initialState,
  reducers: {
    addToast: (state, { payload: toast }: PayloadAction<ToasterToast>) => {
      state.toasts = [toast, ...state.toasts].slice(0, TOAST_LIMIT);
    },
    updateToast: (state, { payload: toast }: PayloadAction<ToasterToast>) => {
      state.toasts = state.toasts.map((t) => (t.id === toast.id ? { ...t, ...toast } : t));
    },
    removeToast: (state, { payload: toastId }: PayloadAction<number>) => {
      state.toasts = state.toasts.filter(({ id }) => id !== toastId);
    }
  }
});

const toastReducer = toastSlice.reducer;
const { addToast, updateToast, removeToast } = toastSlice.actions;

export { toastReducer, addToast, updateToast, removeToast };
