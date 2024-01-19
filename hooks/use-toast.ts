import type {ToastProps} from "~/components/ui/toast";
import {useAppDispatch} from "~/hooks/use-app-dispatch";
import {addToast, removeToast, updateToast} from "~/reducers/toast-reducer";
import {useAppSelector} from "./use-app-selector";

const TOAST_REMOVE_DELAY = 5000;

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

    dispatch(addToast({...props, id, open: true}));

    const update = (props: ToasterToast) => dispatch(updateToast({...props, id}));

    const dismiss = (toastId: number) => {
      setTimeout(() => {
        dispatch(removeToast(toastId));
      }, TOAST_REMOVE_DELAY);
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

export {useToast};
