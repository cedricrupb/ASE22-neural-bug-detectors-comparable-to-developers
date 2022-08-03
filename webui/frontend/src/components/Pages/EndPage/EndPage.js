import React, { useEffect, useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useStyles from './EndPage.styles';
import { Typography } from '@mui/material';
import { PageContext } from '../../../contexts/PageContext';
import axios from 'axios';
import CenterButton from '../../CenterButton/CenterButton';

const EndPage = () => {
    const history = useHistory();
    const urlParams = useParams();
    const { setHeading, setProgress } = useContext(PageContext);
    const [correctTasks, setCorrectTasks] = useState(0);
    const classes = useStyles(correctTasks);

    // Header initialization
    useEffect(() => {
        setHeading('The End');
        setProgress(100);
    }, [setHeading, setProgress]);

    useEffect(() => {
        // Request the score of the user as soon as the page is loaded
        (async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_ORIGIN}/score.json`, {
                    params: {
                        sessionid: urlParams.sid
                    }
                });
                const correctTasksRes = res.data.correctTasks;
                const correctLinenumbersRes = res.data.correctLinenumbers;
                if (correctTasksRes == null || correctLinenumbersRes == null) throw Error('Error while fetching the results');

                setCorrectTasks(correctTasksRes);
            } catch (err) {
                history.push('/', { error: err.message });
            }
        })();
    }, [urlParams, history]);

    const handleRetryClick = () => {
        history.push(`/start/${urlParams.sid}`);
    };

    return (
        <div className={classes.root}>

            <div className={classes.center}>
                <Typography variant="h5">Thanks a lot for your participation in this study!</Typography>
            </div>

            <br />
            <div className={classes.scoreBoxContainer}>
				<div className={classes.scoreBox}>
					<div className={classes.scoreLine} style={{top: '25%'}}></div>
					<div className={classes.scoreLine} style={{top: '50%'}}></div>
					<div className={classes.scoreLine} style={{top: '75%'}}></div>
					
					<div className={classes.scoreLineExt} style={{top: '-1px'}}></div>
					<div className={classes.scoreLineExt} style={{top: '25%'}}></div>
					<div className={classes.scoreLineExt} style={{top: '50%'}}></div>
					<div className={classes.scoreLineExt} style={{top: '75%'}}></div>
					<div className={classes.scoreLineExt} style={{top: '100%'}}></div>

					<div className={classes.scoreLineCaption} style={{top: '8%'}}><Typography><strong>Congratulations!</strong><br /><font size="2">Amazing result!</font></Typography></div>
					<div className={classes.scoreLineCaption} style={{top: '33%'}}><Typography><strong>Well done!</strong><br /><font size="2">Can you also get to the top?</font></Typography></div>
					<div className={classes.scoreLineCaption} style={{top: '58%'}}><Typography><strong>Nice result!</strong><br /><font size="2">How good would you be next round?</font></Typography></div>
					<div className={classes.scoreLineCaption} style={{top: '83%'}}><Typography><strong>Good start!</strong><br /><font size="2">Can you do even better?</font></Typography></div>

					<div className={classes.scoreBoxInner}>
						<div className={classes.scoreCoverBox}><div className={classes.score}><Typography>{Math.max(2, correctTasks) * 12.5}%</Typography></div></div>
					</div>
				</div>
			</div>
            <br />
            <Typography className={classes.center}>
                {/*Your answers will become part of a study comparing human bug detection of variable misuses with bug detection by so called neural bug finders,
                being trained on millions of such bugs mined from public git repositories. */}
                If you are interested in the results of this study,
                you can contact the experimenters by email under <a href="#">Contact Person</a>.
            </Typography>
            <br />
            <div className={classes.center}>
                <Typography>(You may close this browser window now.)</Typography>
                <br />
                <Typography>If you want to try again just click the button below:</Typography>
            </div>
            <br />

            <CenterButton onClick={handleRetryClick}>Retry</CenterButton>

        </div>
    );
};

export default EndPage;
