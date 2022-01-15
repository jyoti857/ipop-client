import { makeStyles } from '@mui/styles';
import { theme } from '../../../../theme/customTheme';

export const useStyles = makeStyles({
  root: {
    margin: theme.size?.margin.primary
  },
  flex_gen: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '98%',
    height: 40,
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  dropdown: {
    width: '100%',
  },
  flex_column:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  orderMore: {
    marginLeft: 10, 
    display: 'flex', 
    justifyContent: 'flex-start'
  }
});