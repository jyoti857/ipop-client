import { makeStyles } from '@mui/styles';
import { theme } from '../../../theme/customTheme';

export const useStyles = makeStyles({
  root: {
    margin: theme.size?.margin.primary,
    scroll: theme.overrides
  }
})