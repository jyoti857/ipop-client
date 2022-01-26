import { Sample, Sample_ } from "./types";

export const columns = [{
  width: 200,
  label: 'Dessert',
  dataKey: 'dessert',
},
{
  width: 120,
  label: 'Calories\u00A0(g)',
  dataKey: 'calories',
  numeric: true,
},
{
  width: 120,
  label: 'Fat\u00A0(g)',
  dataKey: 'fat',
  numeric: true,
},
{
  width: 120,
  label: 'Carbs\u00A0(g)',
  dataKey: 'carbs',
  numeric: true,
},
{
  width: 120,
  label: 'Protein\u00A0(g)',
  dataKey: 'protein',
  numeric: true,
}]


export const sample_: readonly Sample_[] = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  ['Eclair', 262, 16.0, 24, 6.0],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread', 356, 16.0, 49, 3.9],
];


export function createData_(
  id: number, dessert: string, calories: number, fat: number, carbs: number, protein: number
) {
  return { id, dessert, calories, fat, carbs, protein }
}
export function createData(
  id: number, title: string, accountId: string, accountPriceType: string, accountName: string
) {
  return { id, title, accountId, accountPriceType, accountName }
}