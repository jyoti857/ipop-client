import { theme } from '../../theme/customTheme';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    margin: 12,
    fontSize: 10,
  },
  inputTextField: {
    // borderColor: theme.color?.color1,
    marginTop: 12, 
    borderRadius: 6,
    color: theme?.color?.color1,
    lineHeight: 1,
    fontSize: 10,
    // fontSize: theme.size?.fontSize.secondary,
    '&:focus': {
      ouline: "transparent", // not working, will check 
    }
  }
});