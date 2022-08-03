import React from 'react';
import { Button } from '@mui/material';
import useStyles from './CenterButton.styles';

const CenterButton = ({ onClick = () => {}, children = '', disabled = false }) => {
    const classes = useStyles();

    const handleClick = () => {
        onClick();
    };

    return (
        <div className={classes.center}>
            <Button
                disabled={disabled}
                variant="contained"
                onClick={handleClick}
            >
                {children}
            </Button>
        </div>
    );
};

export default CenterButton;
