import { theme } from '../../theme/customTheme';
import { makeStyles } from '@mui/styles';
import { height } from '@mui/system';

export const useStyles = makeStyles({
  root: {
    marginRight: 12, 
    // marginTop: 9,
  },
  formControl: {
    width: '100%',
    lineHeight: 12,
  }
});