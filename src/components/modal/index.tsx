import { ReactElement } from 'react'
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import { useStyles } from './styles';
import { theme } from '../../theme/customTheme';
import { Button, IconButton } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
interface Props {
  open: boolean;
  handleClose: (close: boolean) => void;
  children: ReactElement;
  modalName?: string;
  styles?: any;
  footerButtonName?: string
}

function CustomModal({ open, handleClose, children, modalName, footerButtonName, styles }: Props): ReactElement {
  const classes = useStyles(theme);
  return (
    <div
      style={{ ...styles, position: 'relative', }}
    >
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={classes}>
          <div style={{ position: 'fixed', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', top: 0, left: 0 }}>
            <div style={{ height: 20, fontWeight: 600, top: 20, marginLeft: 20 }}>{modalName}</div>
            <IconButton
              onClick={() => handleClose(false)}
            // style={{ position: 'absolute', top: 6, right: 10 }}
            >
              <CloseOutlined />
            </IconButton>
          </div>
          {children}
          {
            footerButtonName && <Button color='primary' variant='outlined' style={{ position: 'absolute', bottom: 10, right: 10 }}>{footerButtonName}</Button>
          }
        </Box>
        {/* <div className={classes.footer}> </div> */}
      </Modal>
    </div>
  )
}

export default CustomModal
