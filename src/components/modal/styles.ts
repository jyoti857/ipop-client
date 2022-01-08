

import { makeStyles } from '@mui/styles';
import { ThemeOptions } from '@mui/system'

export const useStyles = (theme: ThemeOptions) => ({
  position: 'absolute' as 'absolute',
  top: '70%',
  left: '50%',
  transform: 'translate(-50%, -80%)',
  // maxHeight: 320,  
  // minHeight: 23,
  // maxWidth: 800,
  // overflow: 'scroll',
  // height: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 2, 
  p: 8,
  // paddingLeft: 8
});


export const useCustomFullModalStyle = makeStyles({
  root: {
    width: '100%',
    height: '100vh',
    // margin: '20px auto',
    // position: 'relative',
    boxShadow: '5px 5px 20px  #151254',
    borderStyle: 'none',
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: "0 12px",
  }
})