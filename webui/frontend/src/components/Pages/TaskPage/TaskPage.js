import React, { useState, useEffect, useContext } from 'react';
import useStyles from './TaskPage.styles';
import { Typography } from '@mui/material';
import CodeContainer from '../../CodeContainer/CodeContainer';
import { PageContext } from '../../../contexts/PageContext';
import { TimerContext } from '../../../contexts/TimerContext';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import CenterButton from '../../CenterButton/CenterButton';
import DefinitionTooltip from '../../DefinitionTooltip/DefinitionTooltip';
import { BUTTON_DISABLED_TOOLTIP, VAR_MISUSE_DEFINITION } from '../../../res/definitions';
import BugRadioGroup from '../../BugRadioGroup/BugRadioGroup';
import { ThemeContext } from '../../../contexts/ThemeContex';
import InfoIcon from '@mui/icons-material/Info';

const TaskPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const urlParams = useParams();
    const { setHeading, setProgress } = useContext(PageContext);
    const { startTimer, resetTimer } = useContext(TimerContext);
    const { darkMode } = useContext(ThemeContext);
    const [code, setCode] = useState('');
    const [finishedTasks, setFinishedTasks] = useState(0);
    const [prevSelectedLine, setPrevSelectedLine] = useState(-1);
    const [selectedLine, setSelectedLine] = useState(-1);
    const [bugContained, setBugContained] = useState(true);

    // Check status when component is mounted
    useEffect(() => {
        (async () => {
            const { timeExpired } = await fetchStatus();
            await fetchTask();
            startTimer(timeExpired);
        })();

        // reset timer when component is unmounted
        return () => {
            resetTimer();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update heading/progress and check if last task has been finished
    useEffect(() => {
        setHeading(`Task ${finishedTasks + 1}/8`);
        setProgress(20 + (10 * finishedTasks));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finishedTasks]);

    // Navigate to the end page when the timer ends
    // useEffect(() => {
    //     if (timerEnded) history.push(`/end/${urlParams.sid}`, { timer: true });
    // }, [timerEnded, history, urlParams]);

    // fetch the current status
    const fetchStatus = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ORIGIN}/status.json`, {
                params: {
                    sessionid: urlParams.sid
                }
            });
            const { timeExpired, tasksDone } = res.data;
            if (timeExpired == null || tasksDone == null) throw Error('Error while fetching the status from the server');

            setFinishedTasks(tasksDone);
            startTimer(timeExpired);

            return { tasksDone, timeExpired };
        } catch (err) {
            history.push('/', { error: err.message });
            return 8;
        }
    };

    // fetch the current task
    const fetchTask = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ORIGIN}/task.json`, {
                params: {
                    sessionid: urlParams.sid
                }
            });
            const codeRes = res.data.code;
            if (codeRes == null) throw Error('Error while fetching the task from the server');

            setCode(codeRes);
        } catch (err) {
            history.push('/', { error: err.message });
        }
    };

    // submit the current result
    const submitResult = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_ORIGIN}/result`, {
                sessionid: urlParams.sid,
                buggy: bugContained ? 'yes' : 'no',
                lineNumber: selectedLine
            });
        } catch (err) {
            // Error, but not redirecting the user to the home page
        }
    };

    const handleNextClick = async () => {
        // 1. submit the result
        await submitResult();
        // 2. reset the component state
        resetState();
        // 3. fetch the current status
        const { tasksDone } = await fetchStatus();

        if (tasksDone < 8) {
            // 4.1. if user has not finished all tasks, fetch the next task
            fetchTask();
        } else {
            // 4.2. When the last task has been finished, navigate to the end page
            history.push(`/end/${urlParams.sid}`);
        }
    };

    const handleLineClick = (lineNumber) => {
        if (lineNumber === prevSelectedLine) {
            setSelectedLine(-1);
            setPrevSelectedLine(-1);
        } else {
            setSelectedLine(lineNumber);
            setPrevSelectedLine(lineNumber);
        }
    };

    const handleRadioChange = (event) => {
        const checked = event.target.value === 'true';
        setBugContained(checked);
        if (!checked) {
            setSelectedLine(-1);
        } else {
            setSelectedLine(prevSelectedLine);
        }
    };

    // State needs to be reset in between tasks
    const resetState = () => {
        setSelectedLine(-1);
        setPrevSelectedLine(-1);
        setBugContained(true);
    };

    return (
        <div className={classes.root}>
            <div className={classes.topCaptionContainer}>
                <InfoIcon color="primary" fontSize="large" />
                {/* Definition tooltip */}
                <div className={classes.tooltipContainer}>
                    <Typography variant="body1">Decide whether the code snippet is correct or not. If buggy, click the buggy line.</Typography>
                    <DefinitionTooltip text={VAR_MISUSE_DEFINITION} linkTo="/explanation">[VarMisuse Explanation]</DefinitionTooltip>
                </div>
            </div>

            {/* The code is shown here */}
            <CodeContainer
                code={code}
                selectedLine={selectedLine}
                setSelectedLine={handleLineClick}
                clickable={bugContained}
                darkMode={darkMode}
            />


            {/* User controls */}
            <div className={classes.center}>
                <BugRadioGroup value={bugContained.toString()} onChange={handleRadioChange} />
                {bugContained && selectedLine < 0 ?
                    <DefinitionTooltip text={BUTTON_DISABLED_TOOLTIP} placement="top">
                        <CenterButton
                            onClick={handleNextClick}
                            disabled={bugContained && selectedLine < 0}
                        >
                            Next
                        </CenterButton>
                    </DefinitionTooltip>
                    :
                    <CenterButton
                        onClick={handleNextClick}
                        disabled={bugContained && selectedLine < 0}
                    >
                        Next
                    </CenterButton>}
            </div>

        </div>
    );
};

export default TaskPage;
