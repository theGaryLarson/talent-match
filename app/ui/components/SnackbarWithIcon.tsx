"use client";

import {ChangeEventHandler, useState} from "react";
import { Snackbar, SnackbarContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { green } from '@mui/material/colors';

interface SnackbarWithIconProps {
    open: boolean;
    onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
    message: React.ReactNode;
    icon: React.ReactElement;
    autoHideDuration?: number;
    anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' };
}

const SnackbarWithIcon: React.FC<SnackbarWithIconProps> = ({
    open,
    onClose,
    message,
    icon,
    autoHideDuration = 6000,
    anchorOrigin = { vertical: 'top', horizontal: 'center' },
}) => {
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
            backgroundColor: green[600],
            width: '100%',
            boxSizing: 'border-box',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            }}
            message={
            <div style={{ display: 'flex', alignItems: 'center' }}>
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