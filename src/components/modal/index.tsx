import React, { ReactElement, useState } from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import { useStyles } from './styles';
import { theme } from '../../theme/customTheme';
interface Props {
  open: boolean;
  handleClose: (close: boolean) => void;
  children: ReactElement
}

function CustomModal({ open, handleClose, children }: Props): ReactElement {
  const classes = useStyles(theme);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={classes}>
          {children}
          <button onClick={() => handleClose(false)}> close </button>
        </Box>
      </Modal>
    </div>
  )
}

export default CustomModal
