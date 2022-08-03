import React, { useEffect } from 'react';
import { Container, Paper, Divider } from '@mui/material';
import useStyles from './PageContainer.styles';
import Header from '../Header/Header';
import CopyrightClaim from '../CopyrightClaim/CopyrightClaim';
import { useLocation } from 'react-router-dom';

const PageContainer = ({ children }) => {
    const classes = useStyles();
    const location = useLocation();

    // automatically scroll to top, when URL is changed
    useEffect(() => {
        const contentContainer = document.querySelector('#contentContainer');
        if (contentContainer) contentContainer.scrollTo(0, 0);
    }, [location]);

    return (
        <Container className={classes.root} maxWidth="xl">
            <Paper className={classes.paper}>
                <Header/>
                <Divider className={classes.divider} />
                <div className={classes.content} id="contentContainer">
                    {children}
                </div>
            </Paper>
            <CopyrightClaim/>
        </Container>
    );
};

export default PageContainer;
