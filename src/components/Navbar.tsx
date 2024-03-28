"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { MdWbSunny, MdMyLocation, MdOutlineLocationOn } from "react-icons/md";
import { useAtom } from 'jotai';
import { loadingCityAtom, placeAtom } from '@/app/atom';
import { BASE_URL } from "@/consts";
import SearchBox from './SearchBox';
import SuggestionBox from './SuggestionBox';


type Props = { location?: string };
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function Navbar({location}: Props) {
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [place, setPlace] = useAtom(placeAtom);
    const [_, setLoadingCity] = useAtom(loadingCityAtom);


    async function handleInputChange(value: string) {
        setCity(value);
        if(value.length >= 3) {
            try {
                const response = await axios.get(`${BASE_URL}find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
                const suggestions = response.data.list.map((item:any) => item.name);
                setSuggestions(suggestions);
                setError('');
                setShowSuggestions(true);
            } catch (error) {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    function handleSuggestionClick(value: string) {
        setCity(value);
        setShowSuggestions(false);
    };

    function handleSubmitSearch(event: React.FormEvent<HTMLFormElement>)  {
        setLoadingCity(true);
        event.preventDefault();
        if(suggestions.length === 0) {
            setError('Location not found');
            setLoadingCity(false);
        } else {
            setError('');
            setTimeout(()=>{
                setPlace(city);
                setLoadingCity(false);
                setShowSuggestions(false);
            }, 500);
        }
    };

    function handleCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    setLoadingCity(true);
                    const response = await axios.get(`${BASE_URL}weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
                    setTimeout(() => {
                        setLoadingCity(false);
                        setPlace(response.data.name);
                    }, 500);
                } catch (error) {
                    setLoadingCity(false);
                }
            })
        }
    }

    return (
        <>
            <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
                <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>

                    <div className='flex items-center justify-center gap-2'>
                        <h2 className='text-gray-500 text-3xl'>Weather</h2>
                        <MdWbSunny className='text-3xl mt-1 text-yellow-300' />
                    </div>

                    <div className='flex gap-2 items-center'>
                        <MdMyLocation
                            title='Your Current Location'
                            onClick={handleCurrentLocation}
                            className='text-2xl text-gray-400 hover:opacity-80' />
                        <MdOutlineLocationOn className='text-3xl'/>
                        <p className='text-slate-900/80 text-sm'>{location}</p>
                        <div className='relative hidden md:flex'>
                            <SearchBox value={city} onSubmit={handleSubmitSearch} onChange={(event) => handleInputChange(event.target.value)}/>
                            <SuggestionBox {...{showSuggestions, suggestions, handleSuggestionClick, error}}/>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='flex max-w-7xl px-3 md:hidden'>
                <div className='relative'>
                    <SearchBox value={city} onSubmit={handleSubmitSearch} onChange={(event) => handleInputChange(event.target.value)}/>
                    <SuggestionBox {...{showSuggestions, suggestions, handleSuggestionClick, error}}/>
                </div>
            </div>
        </>
    );
};
