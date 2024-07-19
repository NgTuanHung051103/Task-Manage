export const dateInPast = function (firstDate: Date, secondDate: Date) {
   return firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)
};