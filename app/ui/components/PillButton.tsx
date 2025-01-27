import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface PillButtonProps extends ButtonProps {
  selected?: boolean;
  target?: string;
  href?: string;
}

const PillButton: React.FC<PillButtonProps> = ({
  target,
  href,
  selected = false,
  sx,
  variant = 'contained', // Default variant is contained
  ...props
}) => {
  return (
    <Button
      variant={variant}
      component={href ? 'a' : 'button'}
      href={href || undefined}
      target={target}
      sx={{
        borderRadius: '9999px',
        textTransform: 'none',
        fontWeight: 500,
        transition: 'all 0.3s ease-in-out',
        padding: '0.5rem 1.25rem',

        // Outlined Button
        ...(variant === 'outlined' && {
          border: '1px solid primary.main',
          color: 'primary.main', // Per Figma, text matches border
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'primary.light',
            color: 'secondary.main',
          },
          '&:focus': {
            backgroundColor: 'primary.main',
            color: 'accent.light',
            boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.5)',
          },
          '&:active': {
            backgroundColor: 'primary.light',
            color: 'secondary.main',
          },
          '&.Mui-disabled': {
            backgroundColor: 'accent.light',
            color: 'accent.main',
          },
        }),

        // Default Button
        ...(variant === 'contained' && {
          // Default Primary Button (Idle State)
          backgroundColor: 'primary.main',
          color: 'accent.light',
          '&:hover': {
            backgroundColor: 'primary.light',
            color: 'accent.light',
          },
          '&:focus': {
            backgroundColor: 'secondary.light',
            color: 'accent.light',
            boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.5)',
          },
          '&:active': {
            backgroundColor: 'primary.main',
            color: 'accent.light',
          },
          '&.Mui-disabled': {
            backgroundColor: 'accent.main',
            color: 'accent.dark',
            cursor: 'not-allowed',
          },
        }),
        ...sx,
      }}
      {...props}
    />
  );
};

export default PillButton;
