import { makeStyles } from '@mui/styles';
import { theme } from '../../../../theme/customTheme';

export const useStyles = makeStyles({
  root: {
    margin: theme.size?.margin.primary
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