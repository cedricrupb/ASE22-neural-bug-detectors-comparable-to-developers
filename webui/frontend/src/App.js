import { useContext, useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import makeTheme from './res/theme';
import backgroundLight from './res/img/bg_light.jpg';
import backgroundDark from './res/img/bg_dark.jpg';
import PageContainer from './components/PageContainer/PageContainer';
import HomePage from './components/Pages/HomePage/HomePage';
import StudyOverPage from './components/Pages/StudyOverPage/StudyOverPage';
import SurveyPage from './components/Pages/SurveyPage/SurveyPage';
import ToSPage from './components/Pages/ToSPage/ToSPage';
import ExplanationPage from './components/Pages/ExplanationPage/ExplanationPage';
import StartPage from './components/Pages/StartPage/StartPage';
import EndPage from './components/Pages/EndPage/EndPage';
import ExamplePage from './components/Pages/ExamplePage/ExamplePage';
import TaskPage from './components/Pages/TaskPage/TaskPage';
import ExampleStartPage from './components/Pages/ExampleStartPage/ExampleStartPage';
import PageContextProvider from './contexts/PageContext';
import TimerContextProvider from './contexts/TimerContext';
import { ThemeContext } from './contexts/ThemeContex';
import useMediaQuery from '@mui/material/useMediaQuery';

const App = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const mobileDevice = useMediaQuery('(max-width:500px)');

    useEffect(() => {
        if (prefersDarkMode) toggleDarkMode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prefersDarkMode]);

    const theme = makeTheme(darkMode);

    return (
        <div style={{
            height: '100%',
            backgroundImage: !mobileDevice ? `url(${darkMode ? backgroundDark : backgroundLight})` : '',
			backgroundColor: darkMode ? '#1e1e1e' : 'white',
            WebkitBackgroundSize: 'cover',
            backgroundSize: 'cover'
        }}>
            <HashRouter basename={process.env.REACT_APP_BASENAME}>
                <PageContextProvider>
                    <TimerContextProvider>
                        <ThemeProvider theme={theme}>
                            <PageContainer>
                                <Switch>
                                    <Route exact path="/">
										<HomePage />
                                    </Route>
                                    <Route path="/tos/:sid">
                                        <ToSPage />
                                    </Route>
                                    <Route path="/survey/:sid">
                                        <SurveyPage />
                                    </Route>
                                    <Route path="/explanation/:sid">
                                        <ExplanationPage />
                                    </Route>
                                    <Route exact path="/explanation">
                                        <ExplanationPage />
                                    </Route>
                                    <Route path="/exp_start/:sid">
                                        <ExampleStartPage />
                                    </Route>
                                    <Route path="/example/:id/:sid">
                                        <ExamplePage />
                                    </Route>
                                    <Route path="/start/:sid">
                                        <StartPage />
                                    </Route>
                                    <Route path="/task/:sid">
                                        <TaskPage />
                                    </Route>
                                    <Route path="/end/:sid">
                                        <EndPage />
                                    </Route>
                                    <Redirect to="/" />
                                </Switch>
                            </PageContainer>
                        </ThemeProvider>
                    </TimerContextProvider>
                </PageContextProvider>
            </HashRouter>
        </div>
    );
}

export default App;
