import { makeStyles } from '@mui/styles';
import { ThemeOptions } from '@mui/system';
import { theme } from '../../../theme/customTheme';

export const useStyles = makeStyles({
  root: {
    margin: theme.size?.margin.primary
  },
  paper: {
    width: '70%',
    padding: 12, 
    margin: '22px auto'
  },
  fields: {
    width: '44%', 
    marginRight: 32
  }
})