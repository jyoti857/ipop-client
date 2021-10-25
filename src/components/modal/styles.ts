

import { ThemeOptions } from '@mui/system'

export const useStyles = (theme: ThemeOptions) => ({
  position: 'absolute' as 'absolute',
  top: '70%',
  left: '50%',
  transform: 'translate(-50%, -80%)',
  width: 900,
  // maxHeight: 220,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 2, 
  p: 8
});