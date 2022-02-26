import { HiOutlineCash, HiOutlineReply } from "react-icons/hi";
import { IoArrowUndoOutline } from "react-icons/io5";
import { VscGoToFile } from "react-icons/vsc";
import { C, childOrders, ChildOrderType } from "./childOrderType";

export type menuDataType = 
  {
    iconComponent: any;
    handleOpen?: any;
    orderTypeName: ChildOrderType<C>[C], //Ca<C>;
    orderType: C 
  }[]


export const orderMenuData: menuDataType = [
  // {
  //   iconComponent:VscGoToFile,
  //   orderType: 'SO',
  //   orderTypeName: childOrders['SO']
  // },
  // {
  //   iconComponent:VscGoToFile,
  //   orderType: 'SU',
  //   orderTypeName: childOrders['SU']
  // },
  {
    iconComponent: IoArrowUndoOutline,
    orderType: 'RI',
    orderTypeName: childOrders['RI']
  },
  {
    iconComponent: VscGoToFile,
    orderType: 'RW',
    orderTypeName: childOrders['RW']
  },
  {
    iconComponent: HiOutlineCash,
    orderType: 'SC',
    orderTypeName: childOrders['SC']
  },
  {
    iconComponent: HiOutlineReply,
    orderType: 'SJ',
    orderTypeName: childOrders['SJ']
  },
  // {
  //   iconComponent:HiOutlineCash,
  //   orderType: 'SX',
  //   orderTypeName: childOrders['SX']
  // }
]
