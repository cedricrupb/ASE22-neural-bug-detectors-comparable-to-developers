import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'gray',
        ['@media (max-width:500px)']: { // eslint-disable-line no-useless-computed-key
            display: 'none'
        },
        ['@media (max-height:850px)']: { // eslint-disable-line no-useless-computed-key
            display: 'none'
        }
    }
});

export default useStyles;