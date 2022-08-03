import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useStyles from './Header.styles';
import { Typography, LinearProgress, IconButton, Button } from '@mui/material';
import { PageContext } from '../../contexts/PageContext';
import { TimerContext } from '../../contexts/TimerContext';
import { ThemeContext } from '../../contexts/ThemeContex';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const Header = ({ sid }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { heading = '', progress = 0, progressVisible = true } = useContext(PageContext);
    const { time, status } = useContext(TimerContext);
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    const handleEndButtonClick = () => {
        const pathname = location.pathname.split('/');
        const sid = pathname.pop();
        history.push(`/end/${sid}`);
    };

    return (
        <div className={classes.root}>
            {/* <img src={darkMode ? logoWhite : logo} alt="logo" className={classes.logo} /> */}
            <div className={classes.headingContainer}>
                <Typography
                    variant="h3"
                    color={ darkMode ? 'white' : '#00406B'}
                    className={classes.heading}
                >
                    FixMyVars Study
                </Typography>
                {/* Subheading that changes for each page */}
                <Typography
                    variant="h4"
                    color={ darkMode ? 'white' : '#00406B'}
                    className={classes.subheading}
                >
                    {heading}
                </Typography>
            </div>
            <div className={classes.progressContainer}>
                <div className={classes.timerToggleContainer}>
                    {/* Timer */}
                    {time > 0 && <div className={`${classes.timerContainer} ${classes.subheading}`}>
                        {status === 'STOPPED' && <Button size="medium" variant="contained" color="success" onClick={handleEndButtonClick}>Goto results</Button>}
                        <Typography variant="h3" color={ status === 'STOPPED' ? 'success.main' : darkMode ? 'white' : '#00406B'}>
                            {/* showing the timer in typicall format */}
                            {/* if the seconds are less than 10, add a leading 0 */}
                            {`${Math.floor(time / 60)}:${Math.ceil(time % 60) < 10 ? `0${Math.ceil(time % 60)}` : Math.ceil(time % 60)}`}
                        </Typography>
                    </div>}
                    <IconButton onClick={toggleDarkMode} color="primary">
                        {darkMode ? <Brightness7Icon fontSize="large" /> : <Brightness4Icon fontSize="large" />}
                    </IconButton>
                </div>
                {/* Progress bar */}
                {progressVisible &&
                    <>
                        <LinearProgress variant="determinate" value={progress} style={{ height: '20px', borderRadius: '5px' }} />
                        <div className={classes.progressLabel}>
                            <Typography>{`${progress}%`}</Typography>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default Header;
