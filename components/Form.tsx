import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import {Slot} from "@radix-ui/react-slot";
import type {
  ControllerProps,
  FieldPath,
  FieldValues
} from "react-hook-form";
import {Controller} from "react-hook-form";
import {cn} from "~/utils/className";
import {useFormField} from "~/hooks/useFormField";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{name: props.name}}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
HTMLDivElement,
React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => {
  const id = React.useId();

  const wrapperClassName = cn(
    "space-y-2 mt-6",
    className
  );

  return (
    <FormItemContext.Provider value={{id}}>
      <div ref={ref} className={wrapperClassName} {...props} />
    </FormItemContext.Provider>
  );
});

FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
React.ElementRef<typeof LabelPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({className, ...props}, ref) => {
  const {formItemId} = useFormField();

  const labelClassName = cn(
    "font-medium text-sm text-slate-700 leading-none block mb-2",
    className
  );

  return (
    <LabelPrimitive.Root ref={ref} htmlFor={formItemId} className={labelClassName} {...props} />
  );
});

FormLabel.displayName = "Label";

const FormControl = React.forwardRef<
React.ElementRef<typeof Slot>,
React.ComponentPropsWithoutRef<typeof Slot>
>(({...props}, ref) => {
  const {error, formItemId, formDescriptionId, formMessageId} = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});

FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
HTMLParagraphElement,
React.HTMLAttributes<HTMLParagraphElement>
>(({className, ...props}, ref) => {
  const {formDescriptionId} = useFormField();

  const descriptionClassName = cn(
    "text-xs text-slate-500",
    className
  );

  return (
    <p ref={ref} id={formDescriptionId} className={descriptionClassName} {...props} />
  );
});

FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
HTMLParagraphElement,
React.HTMLAttributes<HTMLParagraphElement>
>(({className, children, ...props}, ref) => {
  const {error, formMessageId} = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  const messageClassName = cn(
    "text-sm font-medium text-red-500",
    className
  );

  return (
    <p ref={ref} id={formMessageId} className={messageClassName} {...props}>
      {body}
    </p>
  );
});

FormMessage.displayName = "FormMessage";

export {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormFieldContext,
  FormItemContext,
  FormMessage,
  FormField
};
