"use client";
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { FieldError, Input, Label, TextField as AriaTextField} from 'react-aria-components';
import { APP_DIR_ALIAS } from 'next/dist/lib/constants';

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  rules?: RegisterOptions<T>;
}

export function TextField<T extends FieldValues>({
  name,
  label,
  control,
  rules
}: FormFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { name, value, onChange, onBlur, ref },
        fieldState: { invalid, error }
      }) => (
        <AriaTextField
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          isRequired={!!rules?.required}
          validationBehavior="aria"
          isInvalid={invalid}
        >
          <Label>{label}</Label>
          <Input ref={ref} />
          <FieldError>{error?.message}</FieldError>
        </AriaTextField>
      )}
    />
  );
}
