import { Avatar } from '@mui/material'
import React, { ReactElement } from 'react'

interface Props {

}

function CustomAvatar({ }: Props): ReactElement {
  return (
    <div>
      <Avatar alt="Remy Sharp" src="https://reqres.in/img/faces/5-image.jpg" />
    </div>
  )
}

export default CustomAvatar
