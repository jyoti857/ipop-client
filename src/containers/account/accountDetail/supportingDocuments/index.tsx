import { Button, Card, Paper } from '@mui/material'
import { Box } from '@mui/system';
import { ReactElement } from 'react'
import { useStyles } from './styles'
import { AiFillFileAdd } from 'react-icons/ai';

interface Props {

}

function SupportingDocuments({ }: Props): ReactElement {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root}>
        <Button
          color='primary'
          variant='contained'
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          Upload file
        </Button>
        <div>
          <div className={classes.fileIcon}>
            <AiFillFileAdd />
          </div>
          <div className={classes.centerLine}>No documents added for this account!</div>
        </div>
      </Paper>
    </div>
  )
}

export default SupportingDocuments
