import React from 'react';
import { FiDroplet } from 'react-icons/fi';
import { ImMeter } from 'react-icons/im';
import { LuEye, LuSunrise, LuSunset } from 'react-icons/lu';
import { MdAir } from 'react-icons/md';
import SingleWeatherDetail from './SingleWeatherDetail';

export interface WeatherDetailProps {
    visability: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
};

export default function WeatherDetails(props: WeatherDetailProps) {
    const {
        visability = "25km",
        humidity = "61%",
        windSpeed = "7 km/h",
        airPressure = "1012 hPa",
        sunrise = "6.20",
        sunset = "18:48"
    } = props;

    return (
        <>
        <SingleWeatherDetail 
            icon={<LuEye />} 
            information='Visability'
            value={visability}
        />
        <SingleWeatherDetail 
            icon={<FiDroplet />} 
            information='Humidity'
            value={humidity}
        />
        <SingleWeatherDetail 
            icon={<MdAir />} 
            information='WindSpeed'
            value={windSpeed}
        />
        <SingleWeatherDetail 
            icon={<ImMeter />} 
            information='AirPressure'
            value={airPressure}
        />
        <SingleWeatherDetail 
            icon={<LuSunrise />} 
            information='Sunrise'
            value={sunrise}
        />
        <SingleWeatherDetail 
            icon={<LuSunset />} 
            information='Sunset'
            value={sunset}
        />
        </>
    );
};
