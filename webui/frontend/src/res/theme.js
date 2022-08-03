import { createTheme } from '@mui/material/styles';

const makeTheme = (darkMode) => {
    return createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        }
    });
};

export default makeTheme;