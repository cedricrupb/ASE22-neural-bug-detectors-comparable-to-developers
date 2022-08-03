import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    center: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        columnGap: '20px'
    },
    box: {
        display: 'inline-block',
        width: '20px',
        height: '0.9rem',
        marginLeft: '5px',
        border: '1px solid transparent',
    },
    tooltipContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    border: {
        border: '1px dashed'
    },
    blackBorder: {
        borderColor: 'black'
    },
    whiteBorder: {
        borderColor: 'white'
    },
    green: {
        backgroundColor: 'rgba(36, 204, 36, 0.5)'
    },
    red: {
        backgroundColor: 'rgba(204, 36, 36, 0.5)'
    },
    feedback: {
        ['@media (max-width:500px)']: { // eslint-disable-line no-useless-computed-key
            display: 'flex',
            flexDirection: 'column'
        }
    },
    explanationContainer: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    topCaptionContainer: {
        display: 'flex',
        alignItems: 'center',
        columnGap: 10
    }
});

export default useStyles;