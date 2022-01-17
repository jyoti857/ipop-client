import { useQuery } from "react-query"
import { getAllDiscountPrices } from "../../../utils/baseUrl"

export const useDiscountGroups = () => {
  const { data, isLoading } = useQuery('getAllDiscountPrices', getAllDiscountPrices)

  return { data, isLoading }
}