import React, { useEffect, useContext } from 'react';
import useStyles from './StartPage.styles';
import { useHistory, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import HourglassBlack from '../../SVGs/HourglassBlack';
import ChecklistBlack from '../../SVGs/ChecklistBlack';
import HourglassWhite from '../../SVGs/HourglassWhite';
import ChecklistWhite from '../../SVGs/ChecklistWhite';
import { PageContext } from '../../../contexts/PageContext';
import CenterButton from '../../CenterButton/CenterButton';
import { ThemeContext } from '../../../contexts/ThemeContex';

const StartPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const urlParams = useParams();
    const { setHeading, setProgress } = useContext(PageContext);
    const { darkMode } = useContext(ThemeContext);

    // Header initialization
    useEffect(() => {
        setHeading('Start');
        setProgress(20);
    }, [setHeading, setProgress]);

    const handleNextClick = () => {
        history.push(`/task/${urlParams.sid}`);
    };

    const handleBackClick = () => {
        history.push(`/explanation/${urlParams.sid}`);
    };

    return (
        <div className={classes.root}>

            <Typography>
                Next, it is your turn. All in all, we recommend you to complete the following 8 code snippets
                in 20 minutes. However, feel free to take as much time as you need for each task. After 20
                minutes you can either end the study, even if you have not finished all 8 tasks, or continue.
                In either case, you will get a summary of your study results. 
            </Typography>
            <ul>
                <li><Typography><strong>Only lines with variable usages</strong> can be buggy.</Typography></li>
                <li><Typography>Mark a line as buggy if the usage of a variable in that line looks “suspicious” - <strong>guessing is okay</strong>.</Typography></li>
                <li><Typography>If you think that there is <strong>no variable misuse</strong> or you are unsure, please <strong>mark the method as non-buggy</strong>.</Typography></li>
                <li><Typography>Each code snippet can contain <strong>maximally one buggy line</strong>.</Typography></li>
                <li><Typography>Syntax errors are <strong>not</strong> counted as variable misuses.</Typography></li>
            </ul>
            <br/>
            {/* Container for the svg images */}
            <div className={classes.contentContainer}>
                <div className={classes.imageContainer}>
                    <div className={classes.imageBlock}>
                        {darkMode ? <HourglassWhite/> : <HourglassBlack/>}
                        {/* <img src={darkMode ? hourglassWhite : hourglassBlack} alt="hourglass"/> */}
                    </div>
                    <Typography>20 minutes</Typography>
                </div>
                <div className={classes.imageContainer}>
                    <div className={classes.imageBlock}>
                        {darkMode ? <ChecklistWhite/> : <ChecklistBlack/>}
                        {/* <img src={darkMode ? checklistWhite : checklistBlack} alt="checklist"/> */}
                    </div>
                    <Typography>8 tasks</Typography>
                </div>
            </div>

            {/* Contains a next AND a back button */}
            <div className={classes.centerFlex}>
                <CenterButton onClick={handleBackClick}>Back to Introduction</CenterButton>
                <CenterButton onClick={handleNextClick}>Next</CenterButton>
            </div>

        </div>
    );
};

export default StartPage;
