import { WeatherData } from "@/consts";

export function getUniqueDataForEachDay(data: WeatherData | undefined) {
  const uniqueDates = [
  ...new Set(
    data?.list.map(
      (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
    )
  )
  ];
  
  const firstDataForEachDate = uniqueDates.map((date) => {
  return data?.list.find((entry) => {
    const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
    const entryTime = new Date(entry.dt * 1000).getHours();
    return entryDate === date && entryTime >= 6;
  });
  });

  return firstDataForEachDate;
};
