import { Button, Card, Paper, TextField } from '@mui/material'
import { Box } from '@mui/system';
import { ReactElement, useState } from 'react'
import { useStyles } from './styles'
import { AiFillFileAdd } from 'react-icons/ai';
import CustomModal from '../../../../components/modal';
import CustomDropdown from '../../../../components/dropdown';

interface Props {

}
const fileUploadData = [
  { value: 'Hospital', desc: 'Hospital' },
  { value: 'AGS', desc: "Ambulatory Surgery System" },
  { value: 'clinic', desc: 'Clinic' },
  { value: 'DOD', desc: "Department of Defence" },
  { value: 'HOPD', desc: 'HOPD' },
]
function SupportingDocuments({ }: Props): ReactElement {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false)
  const [selectFile, setSelectFile] = useState('AGS')
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => setOpen(true)
  const handleChange = (event: any) => {
    setSelectFile(event.target.value)
  }
  return (
    <div>
      <Paper className={classes.root}>
        <Button
          color='primary'
          variant='contained'
          style={{ position: 'absolute', top: 10, right: 10 }}
          onClick={handleOpen}
        >
          Upload file
        </Button>
        <div>
          <div className={classes.fileIcon}>
            <AiFillFileAdd />
          </div>
          <div className={classes.centerLine}>No documents added for this account!</div>
        </div>
        <CustomModal handleClose={handleClose} open={open} >
          <div>
            <div style={{ position: 'absolute', fontWeight: 600, top: 10, left: 20 }}>Upload files</div>
            <div>
              <label>Tag*</label>
              <CustomDropdown data={fileUploadData} value={selectFile} handleChange={handleChange} name='filetype' classNames={classes.customWidth} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label>Comments*</label>
              <TextField className={classes.customWidth} />
            </div>
          </div>
        </CustomModal>
      </Paper>
    </div>
  )
}

export default SupportingDocuments
