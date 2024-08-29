"use client";

import {ChangeEventHandler, useState} from "react";
import { Snackbar, SnackbarContent, Typography, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { Close as CloseIcon, CheckCircleOutline as CheckCircleOutlineIcon, ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material';

// import { green } from '@mui/material/colors';

interface SnackbarWithIconProps {
    open: boolean;
    onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
    variant: 'success' | 'alert';
    message: React.ReactNode;
    // icon: React.ReactElement;
    autoHideDuration?: number;
    anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' };
}

const SnackbarWithIcon: React.FC<SnackbarWithIconProps> = ({
    open,
    onClose,
    message,
    // icon,
    variant,
    autoHideDuration = 600000, // NOTE: adjust time here, added time for testing
    anchorOrigin = { vertical: 'top', horizontal: 'center' },
}) => {
    const icon = variant === 'success' ? <CheckCircleOutlineIcon /> : <ErrorOutlineIcon />;
    const backgroundColor = variant === 'success' ? "#2E7D32" : "#D32F2F";
    return (
        <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
        anchorOrigin={anchorOrigin}
        sx={{
            width: '100%',
            maxWidth: '48rem', // max-w-3xl equivalent
        }}
        >
        <SnackbarContent
            sx={{
            backgroundColor,
            width: '100%',
            boxSizing: 'border-box',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            }}
            message={
            <div className="snackbar-message">
                {icon}
                <div>
                {message}
                </div>
            </div>
            }
            action={
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={onClose}
                sx={{ position: 'absolute', top: 8, right: 8 }}
            >
                <CloseIcon />
            </IconButton>
            }
        />
        </Snackbar>
    );
};

export default SnackbarWithIcon;