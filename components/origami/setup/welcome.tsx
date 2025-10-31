"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { redirect, RedirectType } from "next/navigation"

export function Welcome() {
    const { width, height } = useWindowSize()

    const start = () => {
        new Audio('/sounds/startup.mp3').play().then(() => {
            redirect('/', RedirectType.replace)
        })
    }

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-3 text-center">
                <h1 className="text-2xl font-bold">Welcome to Origami!</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Built by homelabbers, for homelabbers. Contribute, tweak, and share your setup.
                </p>
            </div>
            <Button onClick={start}>
                Get Started
                <ArrowRight className="size-4" />
            </Button>
            <Confetti
                recycle={false}
                width={width}
                height={height}
                colors={[
                    "oklch(0.4341 0.0392 41.9938)", // primary
                    "oklch(0.9200 0.0651 74.3695)", // secondary
                    "oklch(0.9310 0 0)", // accent
                    "oklch(0.2435 0 0)", // foreground
                    "oklch(0.9521 0 0)", // muted
                ]}
            />
        </div>
    )
}
