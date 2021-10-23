import { theme } from '../../theme/customTheme';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    margin: 12,
  },
  inputTextField: {
    borderColor: theme.color?.color1,
    padding: 4,
    paddingLeft: theme?.size?.padding.secondary,
    // lineHeight: 1,
    marginTop: 12, 
    // margin: 21,
    borderRadius: 6,
    color: theme?.color?.color1,
    fontSize: theme.size?.fontSize.secondary,
    '&:focus': {
      ouline: "#f00", // not working, will check 
    }
  }
});