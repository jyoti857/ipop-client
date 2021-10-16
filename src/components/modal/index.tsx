import React, { ReactElement, useState } from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import { useStyles } from './styles';
import { theme } from '../../theme/customTheme';
import { IconButton } from '@mui/material';
import { CloseOutlined, ThreeDRotation } from '@mui/icons-material';
interface Props {
  open: boolean;
  handleClose: (close: boolean) => void;
  children: ReactElement
}

function CustomModal({ open, handleClose, children }: Props): ReactElement {
  const classes = useStyles(theme);
  return (
    <div
      style={{ position: 'relative' }}
    >
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={classes}>
          {children}
          <IconButton
            onClick={() => handleClose(false)}
            style={{ position: 'absolute', top: 6, right: 10 }}
          >
            <CloseOutlined />
          </IconButton>
        </Box>
      </Modal>
    </div>
  )
}

export default CustomModal
