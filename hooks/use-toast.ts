import type { ToastProps } from "~/components/ui/toast";
import { useAppDispatch } from "~/hooks/use-app-dispatch";
import { addToast, removeToast, updateToast } from "~/reducers/toast-reducer";

import { useAppSelector } from "./use-app-selector";

export const TOAST_LIMIT = 1;
export const TOAST_DURATION = 4000;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count;
}

export const useToast = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector(({ toast }) => toast.toasts);

  function toast(props: ToastProps) {
    const id = genId();

    dispatch(
      addToast({
        ...props,
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) {
            dismiss();
          }
        }
      })
    );

    const update = (props: ToastProps) => {
      dispatch(updateToast({ ...props, id }));
    };

    const dismiss = () => {
      dispatch(updateToast({ open: false, id }));

      setTimeout(() => {
        dispatch(removeToast(id));
      }, TOAST_DURATION);
    };

    return {
      id,
      update,
      dismiss
    };
  }

  return {
    toasts,
    toast
  };
};
