import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react';
import useStyles from './BugRadioGroup.styles';

const BugRadioGroup = ({ value, onChange }) => {
    const classes = useStyles();

    return (
        <div className={classes.inputContainer}>
            <Typography>Does this code contain a bug?</Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    row
                    name="bugContained"
                    value={value}
                    onChange={onChange}
                >
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default BugRadioGroup;
