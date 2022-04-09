import { CloseOutlined } from '@mui/icons-material';
import { Button, IconButton, Modal, Paper } from '@mui/material'
import React, { ReactElement } from 'react'
import { theme } from '../../theme/customTheme';
import { useCustomFullModalStyle } from './styles'

interface Props {
  open: boolean;
  handleClose: (close: boolean) => void;
  children: ReactElement;
  modalName?: string;
  styles?: any;
  footerButtonName?: string;
  onSubmit?: any;
  disabled?: boolean
}

function CustomFullModal({ open, handleClose, children, modalName, footerButtonName, styles, onSubmit, disabled }: Props): ReactElement {
  const classes = useCustomFullModalStyle();
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      {/* <Paper> */}
      <div className={classes.root}>
        <div className={classes.header}>
          <div style={{ fontWeight: 700, fontSize: 24 }}>{modalName}</div>
          <IconButton
            onClick={() => handleClose(false)}
          >
            <CloseOutlined />
          </IconButton>
        </div>
        {children}
        {
          footerButtonName && <Button
            onClick={onSubmit}
            color='secondary'
            type='submit'
            variant='outlined'
            disabled={disabled}
            style={{ position: 'absolute', right: 2, margin: 12 }}>{footerButtonName}</Button>
        }
      </div>
      {/* </Paper> */}
    </Modal>
  )
}

export default CustomFullModal
