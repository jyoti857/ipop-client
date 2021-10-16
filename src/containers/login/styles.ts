import { theme } from '../../theme/customTheme';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: 1,
  },
  login: {
    color: theme.status?.danger,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    height: 48,
    padding: '0 30px',
  },
  signinText: {
    fontSize: theme.size?.fontSize.primary,
    color: theme.color?.grey,
    lineHeight: 1.2,
  },
  image: {
    height: '80vh',
    width: 600,
    scale: 1.1
  },
  logo: {
    height: '10vh',
    width: 300,
    marginTop: 23,
    scale: 1.1,
  },
  loginBox: {
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
    border: "1px solid white",
    height: 300,
    margin: 'auto',
    borderRadius: 12,
    padding: theme?.size?.padding.primary,
    // display: 'flex',
    // backgroundColor: 'blue'
  },
  inputTextField: {
    borderStyle: 'solid',
    borderColor: theme.color?.primary,
    padding: theme?.size?.padding.secondary,
    // lineHeight: 1,
    color: theme?.color?.secondary,
    fontSize: theme.size?.fontSize.primary,
    '&:focus': {
      ouline: "#f00", // not working, will check 
    },
    marginTop: 21,
    width: theme.width?.medium,
    borderRadius: 6,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 500,
    alignSelf: 'center'
  },
  loginButton: {
    margin: "23px 0",
    backgroundColor: theme.color?.primary,
    padding: 12,
    fontSize: theme.size?.fontSize.primary,
    borderStyle: 'none',
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    width: theme.width?.medium,
    borderRadius: 12
  }
})