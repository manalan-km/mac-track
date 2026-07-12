import { reportResponse } from '../types/apiResponse.js';
export const generateReport = (responseData: reportResponse, mode: string) => {
  const { startDate, endDate, data } = responseData;
  let calories = 0;
  let protein = 0;
  let fibre = 0;
  const todayDate = new Date(endDate).getDate();
  const todayMonth = new Date(startDate).getMonth() + 1;
  const todayYear = new Date(endDate).getFullYear();
  data.forEach((datum) => {
    calories = calories + datum.calories;
    protein = protein + datum.protein;
    fibre = fibre + datum.fibre;
  });

  /* eslint-disable */
  return `\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*
Date: ${todayDate}/${todayMonth}/${todayYear}
Protein: ${protein}g
Calories: ${calories}kCal
Fiber: ${fibre}g
\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*`;
  /* eslint-enable */
};
