"use client";

import {Toast, ToastProvider, ToastViewport} from "~/components/ui/toast";
import {TOAST_DURATION, useToast} from "~/hooks/use-toast";

const Toaster = () => {
  const {toasts} = useToast();

  return (
    <ToastProvider duration={TOAST_DURATION}>
      {toasts.map(({id, ...props}) => (
        <Toast key={id} {...props} />
      ))}

      <ToastViewport />
    </ToastProvider>
  );
};

export {Toaster};
