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
    width: '96%', 
    marginRight: 32
  },
  label: {
    marginTop: 10, 
    fontWeight: 500,
  },
  inputWrap: {
    width: '48%', 
    display: 'flex', 
    flexDirection: 'column', 
    lineHeight: 1 
  },
  rowWrap: {
    display: 'flex', 
    justifyContent: 'space-between'
  }
})