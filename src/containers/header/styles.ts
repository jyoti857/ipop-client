import { theme } from '../../theme/customTheme';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: 1,
  },
  logo: {
    height: '6vh',
    width: 160,
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
    "&:hover,&.Mui-focusVisible": { backgroundColor: "#E9E6EC" },
    "&:focus": { backgroundColor: "yellow" }
  },
  active: {
    backgroundColor: '#F1C3F1',
  },
  hederBorder: {
    boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;'
  }
});