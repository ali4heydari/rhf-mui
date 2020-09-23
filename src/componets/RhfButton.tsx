import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import type { ButtonProps } from '@material-ui/core/Button';
import { FormState } from 'react-hook-form';

interface RhfButtonProps<TFieldValues extends object> extends ButtonProps {
  formState: FormState<TFieldValues>;
}

export function RhfButton<TFieldValues extends object = object>(
  props: RhfButtonProps<TFieldValues>
) {
  const {
    formState,
    fullWidth = true,
    variant = 'contained',
    color = 'primary',
    children = 'submit',
    ...rest
  } = props;

  return (
    <Button
      {...rest}
      type="submit"
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      disabled={formState.isSubmitting}
      children={children}
      endIcon={
        formState.isSubmitting ? (
          <CircularProgress size={14} variant="indeterminate" color="primary" />
        ) : null
      }
    />
  );
}
