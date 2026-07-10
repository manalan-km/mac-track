import { type Database } from "../../utils/database.types";

type reportResponse = {
  data: Database["public"]["Tables"]["Macros"]["Row"][];
  startDate: string;
  endDate: string;
};

const generateReport = (responseData: reportResponse, mode: string) => {
  const { startDate, endDate, data } = responseData;
  let calories = 0;
  let protein = 0;
  let fibre = 0;
  const todayDate = new Date(endDate).getDate();
  const todayMonth = new Date(endDate).getMonth() + 1;
  const todayYear = new Date(endDate).getFullYear();
  data.forEach((datum) => {
    ((calories = calories + datum.calories),
      (protein = protein + datum.protein),
      (fibre = fibre + datum.fibre));
  });

  console.info("********************************");
  console.info(`Date: ${todayDate}/${todayMonth}/${todayYear}`);
  console.info(`Protein: ${protein}g`);
  console.info(`Calories: ${calories}kCal`);
  console.info(`Fiber: ${fibre}g`);
  console.info("********************************");
};

const processMode = async (reportMode: string) => {
  const response = await fetch(
    `http://127.0.0.1:3000/report?mode=${reportMode}`,
    {
      method: "GET",
    },
  );
  if (!response.ok) {
    console.error("Something went wrong...");
    console.error(await response.json());
    return;
  }
  const data = (await response.json()) as reportResponse;
  if (data.data.length === 0) {
    console.info("No data to crunch.... *sigh*");
    return;
  }

  generateReport(data, reportMode);
};

export default async function (_: {}, mode: string) {
  const allowedModes = ["today", "month", "year"];
  if (!allowedModes.includes(mode)) {
    console.error(
      "Wrong report mode! Allowed modes are: ",
      allowedModes.join(","),
    );
    return;
  }
  if (mode === "week" || mode === "month") {
    console.info("Not implemented yet. Coming soon in terminals next to you");
    return;
  }
  console.log("Crunching numbers....");
  await processMode(mode);
}
