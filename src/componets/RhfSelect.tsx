import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// https://stackoverflow.com/questions/59833120/parsing-error-expected-in-import-type
// eslint-disable-next-line
import type {SelectProps} from "@material-ui/core/Select";
import React from "react";
import {Controller} from "react-hook-form";
// https://stackoverflow.com/questions/59833120/parsing-error-expected-in-import-type
// eslint-disable-next-line
import type {Control, FieldError} from "react-hook-form";

export interface IRhfSelectProp extends SelectProps {
  /**
   * react-hook-form field error
   * */
  rhfError?: FieldError;
  /**
   * react-hook-form form controller
   * */
  control: Control<Record<string, any>>;
  name: string;
  /**
   * select item list that will show on menu if you pass children prop this prop will be ignored
   * @default []
   * */
  items?: { value: any; label?: string }[];
}

export function RhfSelect(props: IRhfSelectProp): React.ReactElement {
  const {
    fullWidth = true,
    required = true,
    margin = "dense",
    variant = "outlined",
    name,
    id = name,
    rhfError,
    control,
    disabled,
    items = [],
    label,
    children,
  } = props;

  return (
    <FormControl
      variant={variant}
      margin={margin}
      required={required}
      fullWidth={fullWidth}
      disabled={disabled}
      error={!!rhfError}
    >
      {label ? <InputLabel id={`${id}-label`}>{label}</InputLabel> : null}
      <Controller
        render={(childProps) => (
          <Select {...childProps} labelId={`${id}_label`} label={label}>
            {children
              ? children
              : items?.map((it) => (
                <MenuItem key={it.value} value={it.value}>
                  {it.label ? it.label : it.value}
                </MenuItem>
              ))}
          </Select>
        )}
        name={name}
        control={control}
      />
      <FormHelperText>
        {rhfError?.message}
      </FormHelperText>
    </FormControl>
  );
}
