import { theme } from '../../theme/customTheme';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    margin: 12,
  },
  inputTextField: {
    borderColor: theme.color?.color1,
    marginTop: 12, 
    borderRadius: 6,
    color: theme?.color?.color1,
    // fontSize: theme.size?.fontSize.secondary,
    '&:focus': {
      ouline: "red", // not working, will check 
    }
  }
});