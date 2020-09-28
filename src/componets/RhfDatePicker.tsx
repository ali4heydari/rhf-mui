import { DatePickerProps, DatePicker } from "@material-ui/pickers";
import React, { useMemo } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { createStyles, FormHelperText, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PickerTextField } from "./PickerTextField";

export interface DatePickerLocalization {
  ok: string;
  cancel: string;
  clear: string;
}

export type IRHFDatePickerProps = Partial<DatePickerProps> & {
  name: string;
  control: Control;
  rhfError?: FieldError;
  localization?: DatePickerLocalization;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1, 0, 0, 0),
    },
  })
);

export function RhfDatePicker(props: IRHFDatePickerProps): React.ReactElement {
  const defaultLocalization = useMemo<DatePickerLocalization>(
    () => ({
      ok: "Ok",
      cancel: "Cancel",
      clear: "Clear",
    }),
    []
  );

  const {
    name,
    label,
    control,
    required = true,
    fullWidth = true,
    clearable = true,
    inputVariant = "outlined",
    margin = "dense",
    format = "jYYYY/jMM/jDD",
    localization = defaultLocalization,
    rhfError,
    ...rest
  } = props;
  const classes = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      render={childProps => (
        <>
          <DatePicker
            {...childProps}
            {...rest}
            className={classes.root}
            okLabel={localization.ok}
            cancelLabel={localization.cancel}
            clearLabel={localization.clear}
            label={label}
            fullWidth={fullWidth}
            clearable={clearable}
            inputVariant={inputVariant}
            format={format}
            required={required}
            margin={margin}
            TextFieldComponent={PickerTextField}
          />
          <FormHelperText>{rhfError?.message}</FormHelperText>
        </>
      )}
    />
  );
}
