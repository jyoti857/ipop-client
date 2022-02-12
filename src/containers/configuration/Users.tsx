import React, { ReactElement } from 'react'
import { forEachChild } from 'typescript';
import CustomizedTables from '../../components/table'
import { useUsersHook } from './users/useUsersHook'
// import check from '../../assets/svg/check-svg'
function createData(
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  gender: number,
  role: string,
  isAdmin: boolean
) {
  return { username, firstName, lastName, email, gender, role, isAdmin };
}
// const a =
function Users(): ReactElement {
  const { users } = useUsersHook()
  console.log("result **", users)
  let rows: any = []
  users?.forEach(({ username, firstName, lastName, email, role, gender, isAdmin }: any) => {
    if (isAdmin) {
        // isAdmin = <Check />

      }
      rows.push(createData(username, firstName, lastName, email, gender, role, isAdmin,))
    })

  return (
    <div>
      <CustomizedTables headers={["User Name", 'First Name', 'Last Name', "Email", "Gender", "Role", "Is Admin"]} rows={rows} />
    </div>
  )
}

export default Users
