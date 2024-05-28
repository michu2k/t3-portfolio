import type {ToastProps} from "~/components/ui/toast";
import {useAppDispatch} from "~/hooks/use-app-dispatch";
import {addToast, removeToast, updateToast} from "~/reducers/toast-reducer";

import {useAppSelector} from "./use-app-selector";

const TOAST_LIMIT = 1;
const TOAST_DURATION = 4000;

type ToasterToast = Omit<ToastProps, "id"> & {
  id: number;
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count;
}

const useToast = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector(({toast}) => toast.toasts);

  function toast(props: Omit<ToasterToast, "id">) {
    const id = genId();

    dispatch(
      addToast({
        ...props,
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) {
            dismiss(id);
          }
        }
      })
    );

    const update = (props: ToasterToast) => {
      dispatch(updateToast({...props, id}));
    };

    const dismiss = (toastId: number) => {
      dispatch(updateToast({id, open: false}));

      setTimeout(() => {
        dispatch(removeToast(toastId));
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

export type {ToasterToast};

export {TOAST_LIMIT, TOAST_DURATION, useToast};
