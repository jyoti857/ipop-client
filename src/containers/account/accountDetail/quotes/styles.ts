import { makeStyles } from "@mui/styles";
import { theme } from "../../../../theme/customTheme";


export const useStyles = makeStyles({
  root: {
    width: '90%',
    // height: 300,
    margin: '20px auto',
    position: 'relative',
    boxShadow: '5px 5px 20px  #151254',
    borderStyle: 'none',
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    outline: theme.color?.color1,
    backgroundColor: theme.color?.color1,
    color: 'white', 
    position: 'absolute',
    top: 10,
    right: 10,
    padding: theme.size?.padding.secondary,
    borderRadius: 7
  },
  fileIcon: {
    backgroundColor: '#EDEFF0',
    height: 70, 
    width: 70,
    display: 'flex',
    borderRadius: '50%',
    fontSize: 30,
    position: 'relative', 
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerLine: {
    marginTop: 13, 
    transform: 'translate(-34%,-50%)'
  }, 
  customWidth: {
    width: 439
  }
})