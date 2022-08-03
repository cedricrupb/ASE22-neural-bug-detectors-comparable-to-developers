import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    centerFlex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '20px'
    },
    contentContainer: {
        margin: '20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: '20px',
        '& img': {
            width: '80px',
            height: 'auto'
        }
    },
    imageBlock: {
        height: '116px'
    }
});

export default useStyles;