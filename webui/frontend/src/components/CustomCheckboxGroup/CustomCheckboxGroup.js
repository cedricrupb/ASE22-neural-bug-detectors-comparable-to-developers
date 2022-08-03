import React from 'react';
import useStyles from './CustomCheckboxGroup.styles';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

const CustomCheckboxGroup = ({ checkboxes = [], onChange }) => {
    const classes = useStyles();

    const handleCheckboxChange = (event) => {
        onChange(event.target.name);
    };

    return (
        <div className={classes.root}>
            <FormGroup>
                {checkboxes.map(cb => (
                    <div className={classes.checkbox} key={cb.name}>
                        <FormControlLabel 
                            control={
                                <Checkbox checked={cb.checked} name={cb.name} onChange={handleCheckboxChange} />
                            } 
                            label={cb.label} 
                        />
                    </div>
                ))}
            </FormGroup>
        </div>
    );
};

export default CustomCheckboxGroup;
