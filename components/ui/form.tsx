import React, { useId } from "react";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";

import { useFormField } from "~/hooks/use-form-field";
import { cn } from "~/utils/cn";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext({} as FormItemContextValue);

const FormItem = ({ className, ...props }: React.ComponentProps<"div">) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("py-4", className)} {...props} />
    </FormItemContext.Provider>
  );
};

type FormLabelProps = React.ComponentProps<typeof LabelPrimitive.Root> & { isOptional?: boolean };

const FormLabel = ({ className, isOptional, children, ...props }: FormLabelProps) => {
  const { formItemId } = useFormField();

  return (
    <LabelPrimitive.Root
      htmlFor={formItemId}
      className={cn("font-poppins text-foreground block pb-3 text-sm leading-5 font-semibold", className)}
      {...props}>
      {children}
      {isOptional && (
        <span className="text-muted-foreground/60 inline-block pl-2 text-xs leading-4 font-medium italic">
          optional
        </span>
      )}
    </LabelPrimitive.Root>
  );
};

const FormLabelSkeleton = ({ className, isOptional, children }: FormLabelProps) => {
  return (
    <span className={cn("font-poppins text-foreground block pb-3 text-sm leading-5 font-semibold", className)}>
      {children}
      {isOptional && (
        <span className="text-muted-foreground/60 inline-block pl-2 text-xs leading-4 font-medium italic">
          optional
        </span>
      )}
    </span>
  );
};

type FormControlProps = React.ComponentProps<typeof Slot> & { withDescription?: boolean };

const FormControl = ({ withDescription, ...props }: FormControlProps) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      id={formItemId}
      aria-describedby={
        withDescription ? (error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId) : undefined
      }
      aria-invalid={error ? true : undefined}
      {...props}
    />
  );
};

const FormDescription = ({ className, ...props }: React.ComponentProps<"p">) => {
  const { formDescriptionId } = useFormField();

  return (
    <p id={formDescriptionId} className={cn("text-muted-foreground pt-3 text-xs leading-5", className)} {...props} />
  );
};

const FormMessage = ({ className, children, ...props }: React.ComponentProps<"p">) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p id={formMessageId} className={cn("font-poppins pt-2 text-xs font-medium text-red-500", className)} {...props}>
      {body}
    </p>
  );
};

export {
  FormFieldContext,
  FormItemContext,
  FormField,
  FormItem,
  FormLabel,
  FormLabelSkeleton,
  FormControl,
  FormDescription,
  FormMessage
};
