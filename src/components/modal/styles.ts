

import {makeStyles} from '@mui/styles'
import { ThemeOptions } from '@mui/system'

export const useStyles = (theme: ThemeOptions) => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -80%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 2, 
  p: 4
});