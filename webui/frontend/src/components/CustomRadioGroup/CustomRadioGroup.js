import React from 'react';
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import useStyles from './CustomRadioGroup.styles';

const CustomRadioGroup = ({ legend = '', name = '', value, buttons = [], onChange = () => {} }) => {
    const classes = useStyles();

    const handleChange = event => {
        onChange(name, event.target.value);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{legend}</FormLabel>
            <RadioGroup
                value={value}
                name={name}
                onChange={handleChange}
            >
                {buttons.map(button => (
                    <div className={classes.radioButton} key={button.value}>
                        <FormControlLabel 
                             
                            value={button.value} 
                            control={<Radio />} 
                            label={button.label} 
                        />
                    </div>
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default CustomRadioGroup;
