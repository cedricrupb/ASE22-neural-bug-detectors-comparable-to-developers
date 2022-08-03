import React, { useEffect, useContext, useState } from 'react';
import { Typography } from '@mui/material';
import useStyles from '../ExplanationPage/ExplanationPage.styles';
import { useHistory, useParams } from 'react-router-dom';
import { PageContext } from '../../../contexts/PageContext';
import CenterButton from '../../CenterButton/CenterButton';

const ExplanationPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const urlParams = useParams();
    const { setHeading, setProgress, setProgressVisible } = useContext(PageContext);
    const [genericPage, setGenericPage] = useState(false);

    // Check if page has been opened by a click on the tooltip
    useEffect(() => {
        if (!urlParams.sid) {
            setGenericPage(true);
            setProgressVisible(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Header initialization
    useEffect(() => {
        setHeading('Explanation');
        setProgress(6);
    }, [setHeading, setProgress]);

    const handleNextClick = () => {
        history.push(`/exp_start/${urlParams.sid}`);
    };

    return (
        <div className={classes.root}>
			<center>
				<Typography><strong>Video Explanation</strong></Typography>
            	{/* <video src={videoFile} className={classes.videoPlayer} controls /> */}
			</center>
			<br/>
			<Typography><strong>Textual Explanation</strong></Typography>
			<Typography>
                This study concerns bug detection in software by humans. 
                The study is restricted to one type of bugs called variable misuses (VarMisuse).
            </Typography>
            <br/>
            <Typography>
                A variable misuse is the wrong usage of a variable name. 
                As a consequence, a variable misuse can only occur in a read access of the variable. 
                This for instance includes variables that appear on the right hand side of an assignment or in a
                loop condition. When a variable misuse occurs, it can always be fixed by using another
                variable defined within the same method, e.g. as a parameter or in a variable definition.
            </Typography>
            <br/>
            <Typography>
                All variable misuse examples in this study are constructed from bug fixes which appeared
                in public git projects (
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/eclipse/jetty.project">1</a>, 
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/Atmosphere/atmosphere">2</a>, 
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/lecho/hellocharts-android">3</a>
                ). Therefore, you will be shown the original method code either before or after the bug is fixed. 
                In contrast to the author of the bug fix you do not see the rest of the code, 
                hence the decision to vote for a bug is often subjective. This is intended in this study. 
                Your task is to find lines in the code which you consider to look "likely wrong" or "suspicious“.
            </Typography>
            <br/>
            <Typography>
                During the study, you will see 8 program snippets (method definitions) written in Java. 
                For each snippet, you need to determine whether it is correct or buggy, and if buggy, you are asked to mark the buggy line. 
                The bugs only concern variable misuses, and only concern variables defined in the method or passed via parameters. 
                Every snippet contains at most one such buggy line. We do not count syntax errors as variable misuses.
            </Typography>

            {!genericPage && <CenterButton onClick={handleNextClick}>Next</CenterButton>}
            
        </div>
    );
};

export default ExplanationPage;
