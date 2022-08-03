import React, { useEffect, useContext } from 'react';
import useStyles from './ExampleStartPage.styles';
import { useHistory, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import ChecklistBlack from '../../SVGs/ChecklistBlack';
import ChecklistWhite from '../../SVGs/ChecklistWhite';
import { PageContext } from '../../../contexts/PageContext';
import CenterButton from '../../CenterButton/CenterButton';
import { ThemeContext } from '../../../contexts/ThemeContex';

const ExampleStartPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const urlParams = useParams();
    const { setHeading, setProgress } = useContext(PageContext);
    const { darkMode } = useContext(ThemeContext);

    // Header initialization
    useEffect(() => {
        setHeading('Examples Start');
        setProgress(7);
    }, [setHeading, setProgress]);

    const handleNextClick = () => {
        history.push(`/example/1/${urlParams.sid}`);
    };

    const handleBackClick = () => {
        history.push(`/explanation/${urlParams.sid}`);
    };

    return (
        <div className={classes.root}>

            <Typography>
                In the following, we will show you three examples you can try before the study starts.
            </Typography>

            {/* Container for the svg images */}
            <div className={classes.contentContainer}>
                <div className={classes.imageContainer}>
                    <div className={classes.imageBlock}>
                        {darkMode ? <ChecklistWhite/> : <ChecklistBlack/>}
                        {/* <img src={darkMode ? checklistWhite : checklistBlack} alt="checklist"/> */}
                    </div>
                    <Typography>3 examples</Typography>
                </div>
            </div>

            {/* Contains a next AND a back button */}
            <div className={classes.centerFlex}>
                <CenterButton onClick={handleBackClick}>Back to Explanation</CenterButton>
                <CenterButton onClick={handleNextClick}>Next</CenterButton>
            </div>

        </div>
    );
};

export default ExampleStartPage;
