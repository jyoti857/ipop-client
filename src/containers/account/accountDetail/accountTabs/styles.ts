import {makeStyles} from '@mui/styles'
import {theme} from '../../../../theme/customTheme'

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    color: theme?.color?.color1,
    marginLeft: 2
  },
  '.Mui-active': {
    color: 'red'
  }
})