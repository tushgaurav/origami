"use client";

import { Sun } from "lucide-react";
import { useEffect, useState } from "react";

function getDateString() {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
        return "Good Morning";
    } else if (hours < 18) {
        return "Good Afternoon";
    } else if (hours < 21) {
        return "Good Evening";
    } else {
        return "Good Night";
    }
}

async function getWeather(latitude: number, longitude: number) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode`);
    const data = await response.json();
    return data;
}

export default function Welcome() {
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    const [weather, setWeather] = useState<any>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                getWeather(position.coords.latitude, position.coords.longitude).then((weather) => {
                    setWeather(weather);
                });
            });
        }
    }, []);

    return (
        <div className="mb-8 flex items-end justify-between">
            <div>
                <h4 className="text-sm text-muted-foreground mb-2">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                <h1 className="text-4xl font-bold">{getDateString()}, Tushar!</h1>
            </div>

            <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                    <Sun className="size-4" />
                    <span className="text-sm">{weather?.current?.temperature_2m} °C</span>
                </div>
                <span className="text-2xl font-bold">{time}</span>
            </div>
        </div>
    );
}