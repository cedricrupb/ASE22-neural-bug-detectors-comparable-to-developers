import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((theme) =>
	createStyles({
		center: {
			textAlign: 'center'
		},
		green: {
			color: 'green',
			fontWeight: 'bold'
		},
		scoreBoxContainer: {
			position: 'relative',
			width: '305px',
			margin: 'auto',
			padding: '25px'
		},
		scoreBox: {
			position: 'relative',
			border: '1px solid black',
			height: '300px',
			width: '75px'
		},
		scoreBoxInner: {
			position: 'absolute',
			top: '0px',
			background: 'linear-gradient(#2f8cc2, #5beb2f 10%, #48ba25 75%, #ebd215 95%)',
			height: '100%',
			width: '100%'
		},
		scoreCoverBox: {
			background: theme.palette.background.paper,
			borderBottom: '2px solid black',
			verticalAlign: 'bottom',
			position: 'relative',
			height: 'calc(100% - 1px)',
			width: '100%',
			transitionDelay: '1s',
			transition: 'height 2s ease-out',
			// eslint-disable-next-line no-dupe-keys
			height: (correctTasks) => `calc(100% - ${12.5 * Math.max(2, correctTasks)}%)`,
			zIndex: '0'
		},
		score: {
			textAlign: 'center',
			position: 'absolute',
			bottom: '0',
			width: '100%'
		},
		scoreLine: {
			position: 'absolute',
			width: '100%',
			borderBottom: '1px dashed gray',
			zIndex: '1'
		},
		scoreLineExt: {
			position: 'absolute',
			left: '100%',
			width: '25px',
			borderBottom: '1px solid black'
		},
		scoreLineCaption: {
			position: 'absolute',
			left: 'calc(100% + 30px)',
			width: '230px',
			marginTop: '-12px'
		}
	})
);

export default useStyles;