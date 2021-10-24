import { Avatar } from '@mui/material'
import React, { ReactElement } from 'react'

export interface CustomAvatarType {
  alt: string;
  src: string;
}

function CustomAvatar({ alt, src }: CustomAvatarType): ReactElement {
  return (
    <div>
      {/* <Avatar alt="Remy Sharp" src="https://reqres.in/img/faces/5-image.jpg" /> */}
      <Avatar alt={alt} src={src} />
    </div>
  )
}

export default CustomAvatar
