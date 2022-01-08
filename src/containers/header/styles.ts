import { theme } from '../../theme/customTheme';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: 1,
  },
  logo: {
    height: '5vh',
    width: 100,
    marginTop: 23,
    scale: 1.1,
    margin: theme.size?.margin.secondary,
  },
  divider: {
    color: theme.color?.secondary,
    borderWidth: 1,
    width: 1, 
  },
  icons: {
    fontSize: 40, 
    outline: 'none',
    // backgroundColor: '#F1C3F1',
    padding: 8,
    borderRadius: 4,
    cursor: 'pointer',
    "&:hover,&.Mui-focusVisible": { backgroundColor: "#F1C3F1" },
    "&:focus": { backgroundColor: "yellow" }
  },
});