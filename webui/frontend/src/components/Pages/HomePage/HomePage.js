import React, { useState, useEffect, useContext } from 'react';
import useStyles from './HomePage.styles';
import CustomRadioGroup from '../../CustomRadioGroup/CustomRadioGroup';
import { useHistory } from 'react-router-dom';
import { Typography } from '@mui/material';
import { PageContext } from '../../../contexts/PageContext';
import axios from 'axios';
import CenterButton from '../../CenterButton/CenterButton';

const HomePage = () => {
    const classes = useStyles();
    const history = useHistory();
    const { setHeading, setProgress } = useContext(PageContext);
    const [secondAttempt, setSecondAttempt] = useState('false');
    const [error, setError] = useState('');

    // If there was a navigation to the home page that was caused by an error, display the error
    useEffect(() => {
        if (history?.location?.state?.error) {
            setError(history.location.state.error);
        }
    }, [history]);

    // Initialization of the header
    useEffect(() => {
        setHeading('Introduction');
        setProgress(0);
    }, [setHeading, setProgress]);

    const handleNextClick = async () => {
        // Request to receive a sessionid
        try {        
            const res = await axios.get(`${process.env.REACT_APP_API_ORIGIN}/sessionid`, {
                params: {
                    secondAttempt
                }
            });
            const sid = res.data;
            if (sid == null) throw Error('There was an error!');

            history.push(`/tos/${sid}`);
        } catch (err) {
            setError(err.message);
        } 
    };

    const handleRadioValueChange = (name, value) => {
        setSecondAttempt(value);
    };

    return (
        <div className={classes.root}>

            {/* Error display (not shown if there is no error) */}
            {error && <div className={`${classes.center} && ${classes.error}`}>
                <Typography variant="h5">{error}</Typography>
            </div>}

            <Typography>
                This study concerns bug detection in software by humans. You will see a number of code snippets which have been part of git commits fixing bugs in software.
                Our intention is to find out whether software developers can identify such bugs without further knowledge about the context of the code.
                In particular, we are interested whether software developers perform better than a machine that has learned to detect these bugs.
                For participating in this study, you should have some experience in programming, ideally in Java. The study will take around <strong>35 minutes</strong>.
            </Typography>

            <div className={classes.radioGroup}>
                <CustomRadioGroup
                    name="secondAttempt"
                    value={secondAttempt}
                    onChange={handleRadioValueChange}
                    buttons={[
                        { label: 'I participate for the first time', value: 'false' },
                        { label: 'I have participated in this study before', value: 'true' },
                    ]}
                />
            </div>

            <CenterButton onClick={handleNextClick}>Next</CenterButton>
            
        </div>
    );
};

export default HomePage;
