import React, { useState, useEffect, useContext } from 'react';
import CustomRadioGroup from '../../CustomRadioGroup/CustomRadioGroup';
import CustomCheckboxGroup from '../../CustomCheckboxGroup/CustomCheckboxGroup';
import { Typography } from '@mui/material';
import useStyles from './SurveyPage.styles';
import { useHistory, useParams } from 'react-router-dom';
import { PageContext } from '../../../contexts/PageContext';
import axios from 'axios';
import CenterButton from '../../CenterButton/CenterButton';

const defaults = {
    team: '',
    in: '',
    work: '',
    experience: '',
    age: '',
    origin: '',
    gender: ''
};

const SurveyPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const urlParams = useParams();
    const { setHeading, setProgress } = useContext(PageContext);
    const [radioValue, setRadioValue] = useState(defaults);
    const [checkboxValue, setCheckboxValue] = useState([]);
    const [surveyReady, setSurveyReady] = useState(false);

    // Header initialization
    useEffect(() => {
        setHeading('Personal Data');
        setProgress(4);
    }, [setHeading, setProgress]);

    // Check if survey form is filled in
    useEffect(() => {
        for(const value of Object.values(radioValue)) {
            if (!value) return;
        }
        setSurveyReady(true);
    }, [radioValue]);

    const handleNextClick = async () => {
        // Submit the survey results to the server
        try {
            await axios.post(`${process.env.REACT_APP_API_ORIGIN}/survey`, {
                sessionid: urlParams.sid,
                team: radioValue.team,
                in: radioValue.in,
                work: {
                    codebase: radioValue.work,
                    tasks: checkboxValue
                },
                experience: radioValue.experience,
                age: radioValue.age,
                origin: radioValue.origin,
                gender: radioValue.gender
            });

            history.push(`/explanation/${urlParams.sid}`);
        } catch (err) {
            history.push('/', { error: err.message });
        }
    };

    const handleRadioValueChange = (name, value) => {
        setRadioValue(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (name) => {
        if (checkboxValue.includes(name)) {
            setCheckboxValue(prev => prev.filter(e => e !== name));
        } else {
            setCheckboxValue(prev => [...prev, name]);
        }
    };

    return (
        <div className={classes.root}>

            <div className={classes.item}>
                <CustomRadioGroup
                    legend="1. I typically develop software"
                    name="team"
                    value={radioValue.team}
                    onChange={handleRadioValueChange}
                    buttons={[
                        { label: 'alone,', value: 'alone' },
                        { label: 'in small teams (up to 10 people),', value: 'small' },
                        { label: 'in larger teams.', value: 'large' },
                    ]}
                />
            </div>

            <div className={classes.item}>
                <CustomRadioGroup
                    legend="2. I typically develop software in"
                    name="in"
                    value={radioValue.in}
                    onChange={handleRadioValueChange}
                    buttons={[
                        { label: 'open source projects,', value: 'oss' },
                        { label: 'commercial projects,', value: 'commercial' },
                        { label: 'others.', value: 'others' }
                    ]}
                />
            </div>

            {/* This item contains a radio group and a checkbox group */}
            <div className={classes.item}>
                <CustomRadioGroup
                    legend="3. I primarily work"
                    name="work"
                    value={radioValue.work}
                    onChange={handleRadioValueChange}
                    buttons={[
                        { label: 'with my own code,', value: 'own' },
                        { label: 'with code developed by others', value: 'others' },
                    ]}
                />
                <Typography>and</Typography>
                <CustomCheckboxGroup
                    onChange={handleCheckboxChange}
                    checkboxes={[
                        { label: 'test the code,', name: 'test', checked: checkboxValue.includes('test') },
                        { label: 'review the code,', name: 'review', checked: checkboxValue.includes('review') },
                        { label: 'develop the code.', name: 'develop', checked: checkboxValue.includes('develop') },
                    ]}
                />
            </div>

            <div className={classes.item}>
                <CustomRadioGroup
                    legend="4. I have regular coding experience with Java for"
                    name="experience"
                    value={radioValue.experience}
                    onChange={handleRadioValueChange}
                    buttons={[
                        { label: '< 2 years (beginner),', value: '2' },
                        { label: '2 - 5 years (intermediate),', value: '2-5' },
                        { label: '> 5 years (advanced).', value: '5' },
                    ]}
                />
            </div>

            <div className={classes.item}>
                <CustomRadioGroup
                    legend="5. My age is between"
                    name="age"
                    value={radioValue.age}
                    onChange={handleRadioValueChange}
                    buttons={[
                        { label: '< 30,', value: '30' },
                        { label: '31 - 50,', value: '31-50' },
                        { label: '> 50.', value: '50' },
						{ label: 'I prefer not to disclose.', value: 'disclosed' },
                    ]}
                />
            </div>

            <div className={classes.item}>
                <CustomRadioGroup
                    legend="6. My country of higher education is in"
                    name="origin"
                    value={radioValue.origin}
                    onChange={handleRadioValueChange}
                    buttons={[
                        { label: 'Europe,', value: 'europe' },
                        { label: 'Asia,', value: 'asia' },
                        { label: 'Australia + New Zealand,', value: 'australia' },
                        { label: 'North America,', value: 'na' },
                        { label: 'South America,', value: 'sa' },
                        { label: 'Africa.', value: 'africa' },
						{ label: 'I prefer not to disclose.', value: 'disclosed' },
                    ]}
                />
            </div>

            <div className={classes.item}>
                <CustomRadioGroup
                    legend="7. My gender is"
                    name="gender"
                    value={radioValue.gender}
                    onChange={handleRadioValueChange}
                    buttons={[
                        { label: 'female,', value: 'female' },
                        { label: 'male,', value: 'male' },
                        { label: 'diverse.', value: 'diverse' },
                        { label: 'I prefer not to disclose.', value: 'disclosed' },
                    ]}
                />
            </div>
            
            <div className={classes.center}>
                {!surveyReady && <Typography>Please fill in the survey in order to continue</Typography>}
                <CenterButton disabled={!surveyReady} onClick={handleNextClick}>Next</CenterButton>
            </div>

        </div >
    );
};

export default SurveyPage;
