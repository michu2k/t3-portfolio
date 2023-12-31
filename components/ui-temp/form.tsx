import React, {useId} from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import {Slot} from "@radix-ui/react-slot";
import type {ControllerProps, FieldPath, FieldValues} from "react-hook-form";
import {Controller} from "react-hook-form";
import {cn} from "~/utils/className";
import {useFormField} from "~/hooks/useFormField";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

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
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({className, ...props}, ref) => {
    const id = useId();

    return (
      <FormItemContext.Provider value={{id}}>
        <div ref={ref} className={cn("py-4", className)} {...props} />
      </FormItemContext.Provider>
    );
  }
);

FormItem.displayName = "FormItem";

type FormLabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {isOptional?: boolean};

const FormLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, FormLabelProps>(
  ({className, isOptional, children, ...props}, ref) => {
    const {formItemId} = useFormField();

    return (
      <LabelPrimitive.Root
        ref={ref}
        htmlFor={formItemId}
        className={cn("block pb-3 font-poppins text-sm font-semibold leading-5 text-slate-700", className)}
        {...props}>
        {children}
        {isOptional && (
          <span className="inline-block pl-2 text-xs font-normal italic leading-4 text-slate-400">optional</span>
        )}
      </LabelPrimitive.Root>
    );
  }
);

FormLabel.displayName = "Label";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot> & {withDescription?: boolean}
>(({withDescription, ...props}, ref) => {
  const {error, formItemId, formDescriptionId, formMessageId} = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        withDescription ? (error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId) : undefined
      }
      aria-invalid={error ? true : undefined}
      {...props}
    />
  );
});

FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({className, ...props}, ref) => {
    const {formDescriptionId} = useFormField();

    return <p ref={ref} id={formDescriptionId} className={cn("pt-3 text-xs leading-5", className)} {...props} />;
  }
);

FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({className, children, ...props}, ref) => {
    const {error, formMessageId} = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn("pt-2 font-poppins text-xs font-medium text-red-500", className)}
        {...props}>
        {body}
      </p>
    );
  }
);

FormMessage.displayName = "FormMessage";

export {FormField, FormItem, FormLabel, FormControl, FormDescription, FormFieldContext, FormItemContext, FormMessage};
