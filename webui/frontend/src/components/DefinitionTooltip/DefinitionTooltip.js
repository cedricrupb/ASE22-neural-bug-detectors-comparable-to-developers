import React from 'react';
import { Tooltip, Typography } from '@mui/material';
import useStyles from './DefinitionTooltip.styles';
import { Link } from 'react-router-dom';

const DefinitionTooltip = ({ text = '', children = '', linkTo = false, placement = 'bottom-end' }) => {
    const classes = useStyles();

    return (
        <Tooltip 
            title={<div style={{whiteSpace: 'pre-line'}}>{text}</div>}
            placement={placement}
        >
            <div className={classes.hoverItem}>
                {linkTo && 
                    <Link to={linkTo} target="_blank" rel="noopener noreferrer">
                        <Typography component="div">{children}</Typography>
                    </Link>}
                {!linkTo && <Typography component="div">{children}</Typography>}
            </div>
        </Tooltip>
    );
};

export default DefinitionTooltip;
