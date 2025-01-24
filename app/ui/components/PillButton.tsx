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
          border: '1px solid #047f9c',
          color: '#047f9c', // Per Figma, text matches border
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: '#E1F5F9',
            color: '#014260',
          },
          '&:focus': {
            backgroundColor: '#047f9c',
            color: '#ffffff',
            boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.5)',
          },
          '&:active': {
            backgroundColor: '#C4EBF3',
            color: '#014260',
          },
          '&.Mui-disabled': {
            backgroundColor: '#F6F6F6',
            color: '#8F8F8F',
          },
        }),

        // Default Button
        ...(variant === 'contained' && {
          // Default Primary Button (Idle State)
          backgroundColor: '#047F9C',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#4FA5BA',
            color: '#ffffff',
          },
          '&:focus': {
            backgroundColor: '#3699B0',
            color: '#ffffff',
            boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.5)',
          },
          '&:active': {
            backgroundColor: '#006682',
            color: '#ffffff',
          },
          '&.Mui-disabled': {
            backgroundColor: '#E5E5E5',
            color: '#1919199A',
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
