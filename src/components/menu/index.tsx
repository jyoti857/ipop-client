import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoArrowUndoOutline } from "react-icons/io5";
import { VscGoToFile } from "react-icons/vsc";
import { HiOutlineCash, HiOutlineReply } from 'react-icons/hi';
import CustomFullModal from '../modal/customFullModal';
import RequestReturn from '../../containers/account/accountDetail/orders/requestReturn';
import MenuComponent from '../../containers/account/accountDetail/orders/utils/menuComponent';
import { orderMenuData } from '../../containers/account/accountDetail/orders/utils/menuData';
import useDropdown from '../../containers/account/accountDetail/orders/utils/useDropdown'
import { transportationDropdownData } from '../../containers/account/accountDetail/orders';
import CustomDropdown from '../dropdown';
import { C, ChildOrderType } from '../../containers/account/accountDetail/orders/utils/childOrderType';

interface Props {
  orderNumber: string;
  selectedOrderDetail: any;
  menuName?: string;
  // selectedOrderId?: string;
  thisOrder?: any;
  setSelectedOrderId?: any
}
const { useState, useEffect } = React
export default function CustomMenu({ orderNumber, selectedOrderDetail, menuName, thisOrder, setSelectedOrderId }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [orderCardOpen, setOrderOpen] = useState(false)
  const [orderTypeModalName, setOrderTypeModalName] = useState('')
  const [orderTypeCode, setOrderTypeCode] = useState('')
  const [orderType, setOrderType] = useState<any>()
  const handleClose = () => setOrderOpen(false)
  const handleOpen = (orderType_: ChildOrderType<C>[C]) => {
    setOrderTypeModalName(orderType_?.desc)
    setOrderTypeCode(orderType_?.code)
    setOrderOpen(true);
    setOrderType(orderType_)
    handleMenuClose();
  }
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setOrderOpen(true);
    console.log("event currentTarget -->", event.currentTarget)
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(thisOrder.id)
    // handleMenuClose()
  };
  console.log("event currentTarget -->", anchorEl)
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [dropdown, handleDropdown] = useDropdown({ transportation: '' });
  console.log("this orderid** -->", thisOrder, selectedOrderDetail)
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant='outlined'
      >
        {menuName || 'Dashboard'}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          orderMenuData.map((s, idx) => {
            return (
              <MenuItem key={idx}>
                <MenuComponent
                  IconComponent={s?.iconComponent}
                  handleOpen={() => handleOpen(s?.orderTypeName)}
                  orderTypeName={s?.orderTypeName?.desc} />
              </MenuItem>
            )
          })
        }
      </Menu>
      {
        orderCardOpen ?
          <CustomFullModal open={orderCardOpen} handleClose={handleClose} modalName={`${orderTypeModalName} - ${orderNumber}`}>
            <div style={{ marginBottom: 20 }}>
              {
                orderTypeCode === 'OTRW' && <div>
                  <label style={{ margin: '0 10px' }}>Select Mode of transportation</label>
                  <CustomDropdown
                    style={{ marginLeft: 1, minWidth: 300 }}
                    name='transportation' handleChange={handleDropdown} placeholder='Select Mode of transportation'
                    value={dropdown.transportation}
                    data={transportationDropdownData}
                  // classNames={classes.dropdown}
                  />
                </div>
              }
              <RequestReturn orderNumber={orderNumber} rows={selectedOrderDetail?.quote?.productQuotes} orderType={orderType} />
            </div>
          </CustomFullModal>
          : ''
      }
    </div >
  );
}