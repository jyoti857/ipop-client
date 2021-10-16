import { theme } from '../../theme/customTheme';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  inputTextField: {
    borderStyle: 'solid',
    borderColor: theme.color?.primary,
    padding: theme?.size?.padding.secondary,
    // lineHeight: 1,
    marginTop: 12, 
    borderRadius: 6,
    color: theme?.color?.secondary,
    fontSize: theme.size?.fontSize.primary,
    '&:focus': {
      ouline: "#f00", // not working, will check 
    }
  }
});