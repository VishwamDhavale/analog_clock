"use client"
import React, { useState, useEffect, useMemo } from 'react';

function ClockFace({ secondDegrees, minuteDegrees, hourDegrees, isDarkMode }) {
    console.log("isDarkMode", isDarkMode, secondDegrees, minuteDegrees, hourDegrees);
    return (
        <div className={`relative h-96 w-96 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-2xl flex items-center justify-center`}>
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="absolute inset-5 text-center"
                    style={{
                        transform: `rotate(${(i + 1) * 30}deg)`
                    }}
                >

                    <span
                        className={`inline-block text-3xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}
                        style={{
                            transform: `rotate(-${(i + 1) * 30}deg)`
                        }}
                    >
                        {i + 1}
                    </span>
                </div>

            ))}
            <div className="relative h-64 w-64 flex items-center justify-center">
                {/* Clock Center */}
                <div
                    className={`absolute h-4 w-4 rounded-full border-4 border-red-500 z-50 ${isDarkMode ? 'bg-white' : 'bg-black'}`}
                ></div>

                {/* Second Hand */}
                <div
                    className="absolute bottom-1/2 left-1/2 w-1 bg-red-500 rounded-lg"
                    style={{
                        height: '130px',
                        transform: `rotate(${secondDegrees}deg)`,
                        transformOrigin: 'bottom center', // Rotates from the center bottom of the hand
                    }}
                ></div>

                {/* Minute Hand */}
                <div
                    className={`absolute bottom-1/2 left-1/2 w-1.5 rounded-lg ${isDarkMode ? 'bg-white' : 'bg-black'}`}
                    style={{
                        height: '120px',
                        transform: `rotate(${minuteDegrees}deg)`,
                        transformOrigin: 'bottom center',
                    }}
                ></div>

                {/* Hour Hand */}
                <div
                    className={`absolute bottom-1/2 left-1/2 w-2 rounded-lg ${isDarkMode ? 'bg-white' : 'bg-black'}`}
                    style={{
                        height: '100px',
                        transform: `rotate(${hourDegrees}deg)`,
                        transformOrigin: 'bottom center',
                    }}
                ></div>
            </div>


        </div>
    );
}

export default function AnalogClock() {
    const [time, setTime] = useState(new Date());
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const secondDegrees = useMemo(() => time.getSeconds() * 6, [time]);
    const minuteDegrees = useMemo(() => time.getMinutes() * 6 + time.getSeconds() * 0.1, [time]);
    const hourDegrees = useMemo(() => time.getHours() * 30 + time.getMinutes() * 0.5, [time]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`flex flex-col items-center gap-y-16`}>
            <ClockFace isDarkMode={isDarkMode} secondDegrees={secondDegrees} minuteDegrees={minuteDegrees} hourDegrees={hourDegrees} />
            <button
                onClick={toggleDarkMode}
                className="px-5 py-2.5 rounded-lg text-2xl font-normal text-white bg-black dark:bg-gray-600 shadow-md hover:opacity-90 transition-all"
            >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </div>
    );
}