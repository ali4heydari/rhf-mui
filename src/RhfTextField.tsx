import { TextField, TextFieldProps, Zoom } from "@material-ui/core";
import React, { CSSProperties } from "react";
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
      helperText={
        rhfError ? (
          <Zoom in={!!rhfError?.message}>
            <span style={helperTextStyle}>{rhfError?.message}</span>
          </Zoom>
        ) : (
          " "
        )
      }
    />
  );
}