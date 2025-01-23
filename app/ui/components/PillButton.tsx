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
        borderRadius: '9999px', // Rounded pill shape
        textTransform: 'none', // Disable uppercase
        fontWeight: 500, // Consistent with Tailwind's 'font-medium'
        transition: 'all 0.3s ease-in-out', // Smooth hover and focus effects
        padding: '0.5rem 1.25rem', // Tailwind's 'py-2 px-5'

        // Outlined Button
        ...(variant === 'outlined' && {
          border: '1px solid #047f9c',
          color: '#047f9c', // Per Figma, text matches border
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: '#E1F5F9', // Tailwind's button.secondary.hover.bg
            color: '#014260', // Tailwind's button.secondary.hover.text
          },
          '&:focus': {
            backgroundColor: '#047f9c', // Tailwind's button.secondary.focus.bg
            color: '#ffffff', // Tailwind's button.secondary.focus.text
            boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.5)', // Mimic focus ring
          },
          '&:active': {
            backgroundColor: '#C4EBF3', // Tailwind's button.secondary.active.bg
            color: '#014260', // Tailwind's button.secondary.active.text
          },
          '&.Mui-disabled': {
            backgroundColor: '#F6F6F6', // Tailwind's button.secondary.disabled.bg
            color: '#8F8F8F', // Tailwind's button.secondary.disabled.text
          },
        }),

        // Default Button
        ...(variant === 'contained' && {
          // Default Primary Button (Idle State)
          backgroundColor: '#047F9C', // Tailwind's button.primary.idle.bg
          color: '#ffffff', // Tailwind's button.primary.idle.text
          '&:hover': {
            backgroundColor: '#4FA5BA', // Tailwind's button.primary.hover.bg
            color: '#ffffff', // Tailwind's button.primary.hover.text
          },
          '&:focus': {
            backgroundColor: '#3699B0', // Tailwind's button.primary.focus.bg
            color: '#ffffff', // Tailwind's button.primary.focus.text
            boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.5)', // Mimic focus ring
          },
          '&:active': {
            backgroundColor: '#006682', // Tailwind's button.primary.active.bg
            color: '#ffffff', // Tailwind's button.primary.active.text
          },
          '&.Mui-disabled': {
            backgroundColor: '#E5E5E5', // Tailwind's button.primary.disabled.bg
            color: '#1919199A', // Tailwind's button.primary.disabled.text
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
