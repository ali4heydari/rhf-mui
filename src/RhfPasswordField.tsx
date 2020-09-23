import { IconButton, InputAdornment } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useCallback, useState } from "react";

import { RhfTextField, RHFTextFieldProps } from "./RhfTextField";

export function RhfPasswordField(props: RHFTextFieldProps): React.ReactElement {
  const { ...rest } = props;
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseDownPassword = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
    },
    []
  );

  const handleClickShowPassword = useCallback((): void => {
    setIsVisible((prevState) => !prevState);
  }, []);

  return (
    <RhfTextField
      {...rest}
      type={isVisible ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {isVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
