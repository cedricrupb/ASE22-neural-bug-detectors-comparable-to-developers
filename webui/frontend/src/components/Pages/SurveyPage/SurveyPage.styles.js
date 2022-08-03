import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
    },
    item: {
        marginBottom: '40px'
    },
    center: {
        textAlign: 'center'
    }
});

export default useStyles;