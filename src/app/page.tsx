"use client";

import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "./atom";
import { BASE_URL, WeatherData } from "@/consts";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import TodayForcast from "@/components/TodayForcast";
import SevenDaysForcast from "@/components/SevenDaysForcast";


export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);
  const [loadindCity, ] = useAtom(loadingCityAtom);

  const { isLoading, data, refetch } = useQuery<WeatherData>(
    'repoData', 
    async () => {
      const {data} = await axios.get(`${BASE_URL}forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`);
      return data;
  }
  );

  const firstData = data?.list[0];

  useEffect(() => {
    refetch();
  }, [place, refetch])

  return (
    <>
      {isLoading ? <Loader/> : 
        (
          <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
            <Navbar location={data?.city.name} />
            <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
              {loadindCity ? <WeatherSkeleton /> :
                <>
                  <TodayForcast data={data} firstData={firstData} />
                  <SevenDaysForcast data={data} />
                </>}
            </main>
          </div>
        )
      }
    </>
  ); 
};
