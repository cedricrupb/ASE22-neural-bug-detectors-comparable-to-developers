import React, { useState, useEffect, useContext } from 'react';
import useStyles from './StudyOverPage.styles';
import { useHistory } from 'react-router-dom';
import { Typography } from '@mui/material';
import { PageContext } from '../../../contexts/PageContext';

const StudyOverPage = () => {
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
        setHeading('Study is over');
        setProgress(0);
    }, [setHeading, setProgress]);

    return (
        <div className={classes.root}>
            <Typography>
                <center>
					The study has ended at the end of February.<br /><br />
					<strong>Thanks again to all the participants!</strong>
				</center>
            </Typography>
        </div>
    );
};

export default StudyOverPage;
