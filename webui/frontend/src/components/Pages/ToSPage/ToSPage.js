import React, { useEffect, useContext } from 'react';
import { Typography } from '@mui/material';
import useStyles from './ToSPage.styles';
import { useHistory, useParams } from 'react-router-dom';
import { PageContext } from '../../../contexts/PageContext';
import CenterButton from '../../CenterButton/CenterButton';

const ToSPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const urlParams = useParams();
    const { setHeading, setProgress } = useContext(PageContext);

    // Header initialization
    useEffect(() => {
        setHeading('Consent Form');
        setProgress(2);
    }, [setHeading, setProgress]);

    const handleNextClick = () => {
        history.push(`/survey/${urlParams.sid}`);
    };

    return (
        <div className={classes.root}>

            <ul className={classes.list}>
                <li><Typography>1. I am aware that the collection, processing and use of my data is voluntary.</Typography></li>
                <li><Typography>2. I have been informed that my following data are stored:</Typography></li>
                <ul className={classes.nestedList}>
                    <li><Typography>a) Age (in ranges),</Typography></li>
                    <li><Typography>b) gender,</Typography></li>
                    <li><Typography>c) origin (in continents),</Typography></li>
                    <li><Typography>d) software development experience,</Typography></li>
                    <li><Typography>e) my IP address in anonymized form (salted hash),</Typography></li>
                    <li><Typography>f) the results of my 8 bug detection tasks,</Typography></li>
                    <li><Typography>g) the time needed for answering each task.</Typography></li>
                </ul>
                <li><Typography>3. I am aware that all hashes of IP addresses will be deleted at the end of the study.</Typography></li>
                <li><Typography>
                    4. I am aware that my data is processed anonymously. My stored data cannot be deleted anymore as there is no way of 
                    linking my data to me. My consent to storing and processing my data is thus irrevocable.
                </Typography></li>
                <li><Typography>5. I agree that my data will be collected, processed, used and stored by ...:</Typography></li>
                <ul className={classes.nestedList}>
                    <li><Typography>
                        a) I agree that the results and primary data of this study may be published by researchers from ...
                        as a scientific publication. The data is published completely anonymously, i.e. 
                        the collected data cannot be related to respective participants. The fully anonymized data from this study may be 
                        made available to other researchers as "open data".
                    </Typography></li>
                    <li><Typography>b) The anonymized data is stored for an indefinite period of time.</Typography></li>
                </ul>
                <li><Typography>
                    6. I am aware that I can contact the <a href="#">data protection officer</a> about general questions
                    regarding the applied data protection regulations. In addition, I am also aware that I can  request a review of the applied regulations 
                    by the responsible <a href="#">regulatory authorities</a>.
                </Typography></li>
                <li><Typography>
                    7. I am aware that I can contact the experimenter about further information by post or email: 
                    <br/><br/>
                    Contact Person
                    <br/>
                    University
                    <br/>
                    Street
                    <br/>
                    City
                    <br/>
                    E-Mail: <a href="#">Contact Person</a>
                </Typography></li>
                
            </ul>
            <br/><br/>
            <Typography>
                By continuing with the study, I assure that I am 18 years or older and I have read and understood the above consent and have been informed of my rights. 
                I certify that I agree to the processing of my data by ....
            </Typography>

            <CenterButton onClick={handleNextClick}>I agree</CenterButton>

        </div>
    );
};

export default ToSPage;
