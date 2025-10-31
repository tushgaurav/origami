"use client"

import { useBattery } from "react-use"
import { Battery as BatteryIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function Battery() {
  const batteryState = useBattery()

  if (!batteryState?.isSupported) {
    return null
  }

  if (!batteryState.fetched) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <BatteryIcon className="h-5 w-5" />
        <span className="text-sm">--</span>
      </div>
    )
  }

  const percentage = Math.round(batteryState.level * 100)
  const isCharging = batteryState.charging
  const isLow = percentage <= 20

  return (
    <div className="flex items-center gap-2">
      <BatteryIcon
        className={cn(
          "h-5 w-5 transition-colors",
          isCharging && "text-primary",
          isLow && !isCharging && "text-destructive",
          !isLow && !isCharging && "text-foreground"
        )}
      />
      <span className="text-sm font-medium tabular-nums">{percentage}%</span>
    </div>
  )
}