"use client";

import React from 'react';
import { format, fromUnixTime, parseISO } from "date-fns";
import { getUniqueDataForEachDay } from '@/utils/getUniqueDataForEachDay';
import { metersToKilometers } from '@/utils/metersToKilometers';
import { converWindSpeed } from '@/utils/converWindSpeed';
import { WeatherData } from '@/consts';
import ForcastWeaterDetail from './ForcastWeaterDetail';


type Props = {
    data: WeatherData | undefined;
};

export default function SevenDaysForcast({ data }: Props) {
  const firstDataForEachDate = getUniqueDataForEachDay(data);

  return (
    <section className="flex flex-col w-full gap-4">
      <p className="text-2xl">Forcast (7 days)</p>
      {firstDataForEachDate.map((d, i) => (
        <ForcastWeaterDetail
          key={i}
          description={d?.weather[0].description ?? ""}
          weatherIcon={d?.weather[0].icon ?? "01d"}
          date={d ? format(parseISO(d.dt_txt), "dd.MM") : ""}
          day={d ? format(parseISO(d.dt_txt), "dd.MM") : "EEEE"}
          feels_like={d?.main.feels_like ?? 0}
          temp={d?.main.temp ?? 0}
          temp_max={d?.main.temp_max ?? 0}
          temp_min={d?.main.temp_min ?? 0}
          airPressure={`${d?.main.pressure} hPa `}
          humidity={`${d?.main.humidity}% `}
          sunrise={format(fromUnixTime(data?.city.sunrise ?? 1702517657), "H:mm")}
          sunset={format(fromUnixTime(data?.city.sunset ?? 1702517657), "H:mm")}
          visability={`${metersToKilometers(d?.visibility ?? 10000)} `}
          windSpeed={`${converWindSpeed(d?.wind.speed ?? 1.64)} `} />
      ))}
    </section>
  );
};
