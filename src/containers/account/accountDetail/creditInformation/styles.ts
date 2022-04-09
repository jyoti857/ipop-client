import { makeStyles } from '@mui/styles';
import { theme } from '../../../../theme/customTheme';

export const useStyles = makeStyles({
  root: {
    margin: theme.size?.margin.primary
  },
  root_: {
    width: '90%',
    minHeight: 300,
    margin: '20px auto',
    position: 'relative',
    boxShadow: '5px 5px 20px  #151254',
    borderStyle: 'none',
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
    alignItems: 'center',
    margin: 'auto'
  },
  centerLine: {
    margin: 'auto',
    zIndex: 12,
    // marginTop: 13, 
    transform: 'translate(-34%,-50%)'
  },
  flex: {
    display: 'flex',
    // width: '95%',
    // margin: '22px auto'
    justifyContent: 'space-between'
  },
  paper: {
    width: '95%',
    padding: 8, 
    margin: '22px auto'
  },
  nestedPaper: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    margin: 23,
    padding: 23,
    width: '122%',
    color: "#C53DAE",//theme!.color?.primary
    fontSize: theme.size?.fontSize.primary,
    // boxShadow: theme.shadows?.[11]
  },
  paperField: {
    width: '46%', 
    marginRight: 32
  },
  fields: {
    width: '96%', 
    marginRight: 32
  },
  label: {
    marginTop: 2, 
    marginLeft: 10, 
    fontWeight: 300,
    fontFamily: "sans-serif",
    fontSize: 14,
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