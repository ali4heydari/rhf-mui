import React, { useState, FocusEventHandler, useCallback } from "react";
import type { TextFieldProps } from "@material-ui/core";
import { InputAdornment, TextField } from "@material-ui/core";
import { Event } from "@material-ui/icons";

export function PickerTextField(props: TextFieldProps) {
  const {
    inputProps = {
      style: { textAlign: "center", direction: "ltr" },
    },
    onFocus: defaultOnFocus,
    autoFocus,
    onBlur: defaultOnBlur,
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState<boolean>(!!autoFocus);

  const onFocus = useCallback<
    FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  >(
    (event) => {
      if (defaultOnFocus) {
        defaultOnFocus(event);
      }
      setIsFocused(true);
    },
    [defaultOnFocus],
  );

  const onBlur = useCallback<
    FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  >(
    (event) => {
      if (defaultOnBlur) {
        defaultOnBlur(event);
      }

      setIsFocused(false);
    },
    [defaultOnBlur],
  );

  return (
    <TextField
      {...rest}
      onFocus={onFocus}
      autoFocus={autoFocus}
      onBlur={onBlur}
      inputProps={inputProps}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Event color={isFocused ? "primary" : "disabled"} />
          </InputAdornment>
        ),
      }}
    />
  );
}
