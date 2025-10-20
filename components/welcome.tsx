"use client";

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

export default function Welcome() {
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mb-8 flex items-end justify-between">
            <div>
                <h4 className="text-sm text-muted-foreground mb-2">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                <h1 className="text-4xl font-bold">{getDateString()}, Tushar!</h1>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{time}</span>
            </div>
        </div>
    );
}