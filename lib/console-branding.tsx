"use client";

import { useEffect } from "react";

export function PrintBranding() {
    console.log("   ____       _                       _ \n  / __ \\     (_)                     (_)\n | |  | |_ __ _  __ _  __ _ _ __ ___  _ \n | |  | | '__| |/ _` |/ _` | '_ ` _ \\| |\n | |__| | |  | | (_| | (_| | | | | | | |\n  \\____/|_|  |_|\\__, |\\__,_|_| |_| |_|_|\n                 __/ |                  \n                |___/                   \n")
    console.log("%cWelcome to your own homelab start page! 🎉", 'color: white; font-size: 16px; font-weight: bold;')
}

export default function ConsoleBranding() {
    useEffect(() => {
        PrintBranding();
    }, []);

    return null;
}