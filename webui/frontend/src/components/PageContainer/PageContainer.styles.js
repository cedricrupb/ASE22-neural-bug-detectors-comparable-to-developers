import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        paddingTop: '30px',
        ['@media (max-width:500px)']: { // eslint-disable-line no-useless-computed-key
            height: '90%',
            paddingLeft: '0 !important',
            paddingRight: '0 !important',
            paddingTop: '0'
        }
    },
    paper: {
        padding: '20px',
        ['@media (max-width:500px)']: { // eslint-disable-line no-useless-computed-key
            borderRadius: '0 !important',
            boxShadow: 'none !important'
        }
    },
    content: {
        overflowY: 'auto',
        marginTop: '20px',
        maxHeight: 'calc(100vh - 225px)'
    }
});

export default useStyles;