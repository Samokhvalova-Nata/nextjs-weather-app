import { cn } from '@/utils/cn';
import React from 'react';
import { IoSearch } from "react-icons/io5";

type Props = {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
    className?: string;
};

export default function SearchBox({onSubmit, onChange, value, className}: Props) {
    return (
        <form className={cn('flex relative items-center justify-center h-10', className)}
        onSubmit={onSubmit}>
            <input type='text' placeholder='Search location...'
                value={value}
                onChange={onChange}
                className='px-4 py-2 w-[230px] border
                border-gray-300 rounded-l-md focus:outline-none
                focus:border-blue-500 h-full'
            />
            <button className='px-4 py-[9px] bg-blue-500
                text-white rounded-r-md focus:outline-none
                hover:bg-blue-600 h-full'>
                <IoSearch />
            </button>
        </form>
    );
};