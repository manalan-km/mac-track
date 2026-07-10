export enum Mode {
  today = "today",
  week = "week",
  month = "month",
}

export const datePeriodCalculator = (mode: Mode, endTime:string) => {
  const timezone = "+00:00";
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  let startDate = "";
  let endDate = "";
  switch (mode) {
    case Mode.today:
      startDate = `${year}-${month}-${day}T00:00:00${timezone}`;
      endDate = `${year}-${month}-${day}T23:59:59${timezone}`;
      break;
    case Mode.week:
      break;

    case Mode.month:
      break;
  }
  return { startDate, endDate };
};
