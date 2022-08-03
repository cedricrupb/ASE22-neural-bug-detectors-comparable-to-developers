import React, { useState, useEffect, useContext } from 'react';
import useStyles from './ExamplePage.styles';
import { Typography } from '@mui/material';
import CodeContainer from '../../CodeContainer/CodeContainer';
import { PageContext } from '../../../contexts/PageContext';
import { useHistory, useParams } from 'react-router-dom';
import { EXAMPLE_1, EXAMPLE_2, EXAMPLE_3 } from '../../../res/examples';
import CenterButton from '../../CenterButton/CenterButton';
import BugRadioGroup from '../../BugRadioGroup/BugRadioGroup';
import { ThemeContext } from '../../../contexts/ThemeContex';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DefinitionTooltip from '../../DefinitionTooltip/DefinitionTooltip';
import { BUTTON_DISABLED_TOOLTIP, VAR_MISUSE_DEFINITION } from '../../../res/definitions';
import InfoIcon from '@mui/icons-material/Info';

const examples = [EXAMPLE_1, EXAMPLE_2, EXAMPLE_3];

const ExamplePage = () => {
    const classes = useStyles();
    const history = useHistory();
    const urlParams = useParams();
    const { setHeading, setProgress } = useContext(PageContext);
    const { darkMode } = useContext(ThemeContext);
    const [code, setCode] = useState('');
    const [explanationView, setExplanationView] = useState(false);
    const [prevSelectedLine, setPrevSelectedLine] = useState(-1);
    const [selectedLine, setSelectedLine] = useState(-1);
    const [bugContained, setBugContained] = useState(true);

    // Header initialization
    useEffect(() => {
        setHeading(`Example ${urlParams.id}/${examples.length}`);
        setProgress(8 + (4 * (urlParams.id - 1)));
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlParams]);

    // Check if the requested example exists, if not redirect to home page
    useEffect(() => {
        const id = Number(urlParams.id);
        if (!id || id < 1 || id > examples.length) {
            history.push(`/`, { error: 'The requested example does not exist' });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // set the shown code (buggy or correct code)
    useEffect(() => {
        const id = Number(urlParams.id);
        if (isNaN(id) || id < 1 || id > 3) return;

        if (!explanationView) {
            setCode(examples[urlParams.id - 1].code);
        } else {
            setCode(examples[urlParams.id - 1].correctCode);
        }
    }, [explanationView, urlParams]);


    const handleNextClick = () => {
        // Show the explanation view
        if (!explanationView) {
            setProgress(prev => prev + 2);
            handleSelectionLineOffset();
            setExplanationView(true);
            return;
        }

        // Show next example or, if the last example was alredy shown, navigate to the start page
        if (urlParams.id < examples.length) {
            setCode('');
            resetState();
            history.push(`/example/${Number(urlParams.id) + 1}/${urlParams.sid}`);
        } else {
            history.push(`/start/${urlParams.sid}`);
        }
    };

    // If the code snippet was buggy, the correct code snippet contains one more line than the buggy one (fixed line)
    // Therefore an offset to the user selected line has to be calculated
    const handleSelectionLineOffset = () => {
        const example = examples[urlParams.id - 1];
        if (!example.wrong) return;
        if (example.wrongLine >= selectedLine) return;

        setSelectedLine(prev => prev + 1);
    };

    // State has to be reseted before showing the next example
    const resetState = () => {
        setSelectedLine(-1);
        setPrevSelectedLine(-1);
        setBugContained(true);
        setExplanationView(false);
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

    return (
        <div className={classes.root}>
            {/* Different messages for the explanation view */}
            <div className={classes.topCaptionContainer}>
                <InfoIcon color="primary" fontSize="large" />
                <div className={classes.tooltipContainer}>
                    {!explanationView && <Typography>Decide whether the code snippet is correct or not. If buggy, click the buggy line.</Typography>}
                    {/* Depending on whether the code snippet was correct or not different messages are shown in the explanation window */}
                    {explanationView &&
                        <>
                            <Typography>
                                Here is the solution (
                                <span className={`${classes.border} ${classes.box} ${darkMode ? classes.whiteBorder : classes.blackBorder}`} /> the line you marked,
                                <span className={`${classes.red} ${classes.box}`} /> buggy line,
                                <span className={`${classes.green} ${classes.box}`} /> the fixed line
                                )
                            </Typography>
                        </>
                    }
                    <DefinitionTooltip text={VAR_MISUSE_DEFINITION} linkTo="/explanation">[VarMisuse Explanation]</DefinitionTooltip>
                </div>
            </div>
            {/* Code is shown here */}
            <CodeContainer
                code={code}
                selectedLine={selectedLine}
                setSelectedLine={handleLineClick}
                clickable={!explanationView && bugContained}
                redLine={explanationView && examples[urlParams.id - 1].wrong ? examples[urlParams.id - 1].wrongLine : -1}
                greenLine={explanationView && examples[urlParams.id - 1].wrong ? examples[urlParams.id - 1].wrongLine + 1 : -1}
                darkMode={darkMode}
                example={true}
            />

            {/* User feedback */}
            {explanationView &&
                <div>
                    <div className={`${classes.center} ${classes.feedback}`}>
                        {examples[urlParams.id - 1].wrong && bugContained && examples[urlParams.id - 1].wrongLine === selectedLine &&
                            <>
                                <CheckIcon style={{ fill: '#189a01' }} fontSize="large" />
                                <Typography>Your answer was correct. The buggy line is </Typography>
                                <Typography style={{ fontFamily: 'Courier, Monospace' }}>{examples[urlParams.id - 1].wrongLine}: {examples[urlParams.id - 1].wrongLineContent}</Typography>
                            </>
                        }
                        {examples[urlParams.id - 1].wrong && bugContained && examples[urlParams.id - 1].wrongLine !== selectedLine &&
                            <>
                                <CloseIcon style={{ fill: '#fe0000' }} fontSize="large" />
                                <Typography>Your answer was incorrect. The buggy line is </Typography>
                                <Typography style={{ fontFamily: 'Courier, Monospace' }}>{examples[urlParams.id - 1].wrongLine}: {examples[urlParams.id - 1].wrongLineContent}</Typography>
                            </>
                        }
                        {!examples[urlParams.id - 1].wrong && !bugContained &&
                            <>
                                <CheckIcon style={{ fill: '#189a01' }} fontSize="large" />
                                <Typography>Your answer was correct. The program does not contain a buggy line.</Typography>
                            </>
                        }
                        {examples[urlParams.id - 1].wrong && !bugContained &&
                            <>
                                <CloseIcon style={{ fill: '#fe0000' }} fontSize="large" />
                                <Typography>Your answer was incorrect. The program does contain a buggy line.</Typography>
                            </>
                        }
                        {!examples[urlParams.id - 1].wrong && bugContained &&
                            <>
                                <CloseIcon style={{ fill: '#fe0000' }} fontSize="large" />
                                <Typography>Your answer was incorrect. The program does not contain a buggy line.</Typography>
                            </>
                        }
                    </div>
                    <div className={classes.explanationContainer}>
                        <Typography dangerouslySetInnerHTML={{ __html: `<strong>Explanation:</strong> ${examples[urlParams.id - 1].explanation}` }}></Typography>
                    </div>
                </div>
            }

            {/* User controls */}
            <div className={classes.center}>
                {/* If the explanation view is shown, remove the checkbox */}
                {!explanationView &&
                    <BugRadioGroup value={bugContained.toString()} onChange={handleRadioChange} />
                }
                {!explanationView && bugContained && selectedLine < 0 ?
                    <DefinitionTooltip text={BUTTON_DISABLED_TOOLTIP} placement="top">
                        <CenterButton
                            onClick={handleNextClick}
                            disabled={!explanationView && bugContained && selectedLine < 0}
                        >
                            Next
                        </CenterButton>
                    </DefinitionTooltip>
                    :
                    <CenterButton
                            onClick={handleNextClick}
                            disabled={!explanationView && bugContained && selectedLine < 0}
                        >
                            Next
                    </CenterButton>}
            </div>

        </div>
    );
};

export default ExamplePage;
