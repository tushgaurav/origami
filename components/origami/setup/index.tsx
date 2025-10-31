"use client"

import { useState } from "react";
import { ProceedType } from "./types";

import { SetupForm } from "./setup-form";
import { Welcome } from "./welcome";

export default function Setup() {
    const [proceed, setProceed] = useState<ProceedType>(ProceedType.FORM);

    if (proceed === ProceedType.WELCOME) {
        return <Welcome />
    }

    if (proceed === ProceedType.FORM) {
        return <SetupForm setProceed={setProceed} />
    }
}
