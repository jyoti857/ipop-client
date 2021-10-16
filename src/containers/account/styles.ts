import { theme } from '../../theme/customTheme';
import { makeStyles } from '@mui/styles';
import { ThemeOptions } from '@mui/system';

export const useStyles = makeStyles({
  root: {
    margin: theme.size?.margin.primary
  },
  accountsText: {
    color: theme.status?.primary,
    fontSize: theme.size?.fontSize.primary,
    fontWeight: 'bold'
  },
  accountCount: {
    background: theme.color?.grey,
    color: theme.color?.primary,
    padding: '6px 12px', 
    borderRadius: 12,
    marginLeft: 4,
  }, 
  newAccountButton: {
    backgroundColor: theme.color?.primary,
    color: 'white',
    fontWeight: 400,
    padding: '6px 12px',
    outline: "none",
    borderRadius: 7,
    borderColor: theme.color?.primary,
    boxShadow: '5px 5px 20px  #151254'
  },
  flexContaier: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  noClick: {
    cursor: 'initial',
  },
  tableCell: {
    flex: 1 
  },
  tableRow:{
    cursor: 'pointer'
  }, 
  tableRowHeader: {
    '&:hover': {
      backgroundColor: theme.color?.secondary
    }
  },
  table: {
    '& .ReactVirtualized__Table__headerRow': {
      ...(theme.direction === 'rtl' && {
        paddingLeft: '0 !important',
      }),
      ...(theme.direction !== 'rtl' && {
        paddingRight: undefined,
      }),
    },
  }
})