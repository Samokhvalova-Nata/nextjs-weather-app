"use client";

import React from 'react';
import { format, fromUnixTime, parseISO } from "date-fns";
import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';
import { getDayOrNigthIcon } from '@/utils/getDayOrNigthIcon';
import { metersToKilometers } from '@/utils/metersToKilometers';
import { converWindSpeed } from '@/utils/converWindSpeed';
import { WeatherData, WeatherListItem } from "@/consts";
import Container from './Container'
import WeatherIcon from './WeatherIcon';
import WeatherDetails from './WeaterDetails';


type Props = {
    data: WeatherData | undefined;
    firstData: WeatherListItem | undefined;
};

export default function TodayForcast({data, firstData}: Props) {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h2 className="flex gap-1 text-2xl items-end">
          <p>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</p>
          <p className="text-lg">({format(parseISO(firstData?.dt_txt ?? ''), 'dd.MM.yyyy')})</p>
        </h2>
        <Container className="gap-10 px-6 items-center">
          {/* {temprature} */}
          <div className="flex flex-col px-4">
            <span className="text-5xl">
              {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
            </span>
            <p className="text-xs space-x-1 whitespace-nowrap">
              <span>Feels like</span>
              <span>{convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°</span>
            </p>
            <p className="text-xs space-x-2">
              <span>{convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}° ↓{" "}</span>
              <span>{" "}{convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑ </span>
            </p>
          </div>
          {/* {time and weather icon} */}
          <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
            {data?.list.map((d, i) => (
              <div key={i} className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                <p className="whitespace-nowrap">{format(parseISO(d.dt_txt), 'h:mm a')}</p>
                <WeatherIcon iconname={getDayOrNigthIcon(d.weather[0].icon, d.dt_txt)} />
                <p>{convertKelvinToCelsius(firstData?.main.temp ?? 0)}°</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
      <div className="flex gap-4">
        {/* left */}
        <Container className="w-fit justify-center flex-col px-4 items-center">
          <p className="capitalize text-center">
            {firstData?.weather[0].description}{" "}
          </p>
          <WeatherIcon iconname={getDayOrNigthIcon(
            firstData?.weather[0].icon ?? '',
            firstData?.dt_txt ?? '')} />
        </Container>
        {/* right */}
        <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
          <WeatherDetails
            visability={metersToKilometers(firstData?.visibility ?? 1000)}
            airPressure={`${firstData?.main.pressure} hPa`}
            humidity={`${firstData?.main.humidity}`}
            sunrise={format(fromUnixTime(data?.city.sunrise ?? 1702949452), 'H:mm')}
            sunset={format(fromUnixTime(data?.city.sunset ?? 1702949452), 'H:mm')}
            windSpeed={converWindSpeed(firstData?.wind.speed ?? 1.64)}
          />
        </Container>
      </div>
    </section>
  );
};
