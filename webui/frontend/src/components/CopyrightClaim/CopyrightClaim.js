import React from 'react';
import { Typography } from '@mui/material';
import useStyles from './CopyrightClaim.styles';

const CopyrightClaim = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography>© FixMyVars Study Designer</Typography>
        </div>
    );
};

export default CopyrightClaim;
