import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    center: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '20px'
    },
    tooltipContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    box: {
        display: 'inline-block',
        width: '20px',
        height: '0.9rem',
        marginLeft: '5px',
        border: '1px solid transparent',
    },
    border: {
        border: '1px dashed black',
    },
    green: {
        backgroundColor: 'lightgreen'
    },
    red: {
        backgroundColor: '#ff7f7f'
    },
    topCaptionContainer: {
        display: 'flex',
        alignItems: 'center',
        columnGap: 10
    }
});

export default useStyles;