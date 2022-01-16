

export const addDays = (date: Date, days: number): Date => {
  const inDays = new Date(date)
  inDays.setDate(inDays.getDate()+ days);
  return inDays;
}