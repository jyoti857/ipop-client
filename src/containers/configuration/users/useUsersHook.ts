import { useQuery } from "react-query"
import { getUserList } from "../../../utils/baseUrl"


export const useUsersHook = () => {
  const {data }: {data: any}= useQuery("user-all-query", getUserList)
  console.log("users result --> ", data)
  const s = data?.map(({ username, email,  profile: {firstName, lastName}, userRole: {isAdmin, role}}: any) => 
   ({username, email, firstName, lastName, isAdmin, role})
  )
  return {users: s}
}