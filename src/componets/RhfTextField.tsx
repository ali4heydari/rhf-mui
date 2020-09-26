import TextField from "@material-ui/core/TextField";
// https://stackoverflow.com/questions/59833120/parsing-error-expected-in-import-type
// eslint-disable-next-line
import type { TextFieldProps } from "@material-ui/core/TextField";
import React, { CSSProperties } from "react";
// https://stackoverflow.com/questions/59833120/parsing-error-expected-in-import-type
// eslint-disable-next-line
import type { FieldError } from "react-hook-form";

export type RHFTextFieldProps = TextFieldProps & {
  /**
   * react-hook-form field error
   * */
  rhfError?: FieldError;
  /**
   * custom text that applies to TextField's helper text (field error)
   * */
  helperTextStyle?: CSSProperties;
};

export function RhfTextField(props: RHFTextFieldProps): React.ReactElement {
  const {
    variant = "outlined",
    margin = "dense",
    fullWidth = true,
    required = true,
    autoComplete = "off",
    rhfError,
    helperTextStyle,
    ...rest
  } = props;

  return (
    <TextField
      {...rest}
      fullWidth={fullWidth}
      required={required}
      variant={variant}
      margin={margin}
      error={!!rhfError}
      autoComplete={autoComplete}
      helperText={rhfError?.message}
    />
  );
}
