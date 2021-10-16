import { theme } from '../../theme/customTheme';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  inputTextField: {
    borderColor: theme.color?.primary,
    padding: 4,
    paddingLeft: theme?.size?.padding.secondary,
    // lineHeight: 1,
    marginTop: 12, 
    borderRadius: 6,
    color: theme?.color?.secondary,
    fontSize: theme.size?.fontSize.secondary,
    '&:focus': {
      ouline: "#f00", // not working, will check 
    }
  }
});