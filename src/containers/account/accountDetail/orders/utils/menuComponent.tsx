import React from 'react'

type Props = {
  IconComponent: any;
  handleOpen: any;
  orderTypeName: string;
}

function MenuComponent({ IconComponent, handleOpen, orderTypeName }: Props) {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <IconComponent size={24} />
        <div
          style={{ padding: 6, fontSize: 14, fontWeight: 400, textAlign: 'left' }}
          onClick={handleOpen}
        >{orderTypeName}</div>
      </div>
    </div>
  )
}

export default MenuComponent