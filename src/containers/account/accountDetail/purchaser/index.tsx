import { Paper, TextField, Button, Divider } from '@mui/material'
import { ReactElement, useState } from 'react'
import { FaAccessibleIcon } from 'react-icons/fa';
import CustomAvatar, { CustomAvatarType } from '../../../../components/avatar';
import CustomInput from '../../../../components/input/CustomInput';
import CustomModal from '../../../../components/modal';
import { useStyles } from './styles';

interface Props {

}
const purchaserData: CustomAvatarType[] = [
  { alt: 'Remy Sharp', src: 'https://reqres.in/img/faces/5-image.jpg' },
  { alt: 'Remy Sharp', src: 'https://reqres.in/img/faces/5-image.jpg' },
  { alt: 'Remy Sharp', src: 'https://reqres.in/img/faces/5-image.jpg' },
  { alt: 'Remy Sharp', src: 'https://reqres.in/img/faces/5-image.jpg' },
]
function Purchaser({ }: Props): ReactElement {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState('')
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => setOpen(true)
  const handleChange = (event: any) => {
    setSearch(event.target.value)
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
          Add
        </Button>
        <div>
          <div className={classes.fileIcon}>
            <FaAccessibleIcon />
          </div>
          <div className={classes.centerLine}>No purchasers found for this account!</div>
        </div>
        <CustomModal handleClose={handleClose} open={open} >
          <div>
            <div style={{ position: 'absolute', fontWeight: 600, top: 10, left: 20 }}>Add Purchaser</div>
            <div>
              <CustomInput value={search} name='search' type='text' placeholder='Search' style={{ width: '100%' }} />
            </div>
            {
              purchaserData.map(purchaser => {
                return (
                  <div>
                    <div style={{ display: 'flex', margin: 10 }}>
                      <CustomAvatar alt={purchaser.alt} src={purchaser.src} />
                      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                        <span>David Andersen</span>
                        <span>david.andersen@example.com</span>
                      </div>
                    </div>
                    <Divider />
                  </div>
                )
              })
            }
          </div>
        </CustomModal>
      </Paper>
    </div>
  )
}

export default Purchaser
