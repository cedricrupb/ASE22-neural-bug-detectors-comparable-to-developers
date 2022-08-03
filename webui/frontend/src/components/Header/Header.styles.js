import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            ['@media (max-width:500px)']: { // eslint-disable-line no-useless-computed-key
                flexDirection: 'column'
            }
        },
        logo: {
            height: '90px',
            margin: '5px',
            marginRight: '50px',
            ['@media (max-width:500px)']: { // eslint-disable-line no-useless-computed-key
                display: 'none'
            }
        },
        timerContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            columnGap: 10
        },
        progressContainer: {
            width: '50%',
            marginLeft: 'auto',
            marginTop: 'auto',
            ['@media (max-width:500px)']: { // eslint-disable-line no-useless-computed-key
                width: '100%'
            }
        },
        progressBar: {
            height: '30px',
        },
        progressLabel: {
            position: 'relative',
            bottom: '20px',
            textAlign: 'center',
            color: 'white'
        },
        timerToggleContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            columnGap: '20px'
        },
        heading: {
            ['@media (max-width:500px)']: { // eslint-disable-line no-useless-computed-key
                fontSize: '2rem !important'
            }
        },
        subheading: {
            ['@media (max-width:500px)']: { // eslint-disable-line no-useless-computed-key
                fontSize: '1.5rem !important'
            }
        }
    })
);

export default useStyles;