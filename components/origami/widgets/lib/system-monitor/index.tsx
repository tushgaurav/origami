"use client"

import { useEffect, useState } from "react"
import { Cpu, MemoryStick } from "lucide-react"
import { Area, AreaChart, CartesianGrid } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Title, Widget, WidgetContent, WidgetHeader } from "../../base-widget"
import { Progress } from "@/components/ui/progress"

interface SystemData {
  time: string
  cpu: number
}

interface MemoryData {
  label: string
  used: number
  total: number
  percentage: number
  color: string
}

const chartConfig = {
  cpu: {
    label: "CPU Usage",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

function generateInitialData(): SystemData[] {
  return Array.from({ length: 20 }, (_, i) => ({
    time: `${i}s`,
    cpu: Math.floor(Math.random() * 30) + 20,
  }))
}

function generateMemoryData(): MemoryData[] {
  return [
    {
      label: "RAM",
      used: 12.4,
      total: 16,
      percentage: 77.5,
      color: "hsl(var(--chart-2))",
    },
    {
      label: "Swap",
      used: 2.1,
      total: 8,
      percentage: 26.25,
      color: "hsl(var(--chart-3))",
    },
  ]
}

export default function SystemMonitor() {
  const [cpuData, setCpuData] = useState<SystemData[]>(generateInitialData())
  const [memoryData] = useState<MemoryData[]>(generateMemoryData())
  const [currentCpu, setCurrentCpu] = useState(45)

  useEffect(() => {
    const interval = setInterval(() => {
      const newCpu = Math.floor(Math.random() * 40) + 30
      setCurrentCpu(newCpu)
      
      setCpuData((prev) => {
        const newData = [...prev.slice(1), {
          time: `${Date.now() % 60}s`,
          cpu: newCpu,
        }]
        return newData
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Widget>
      <WidgetHeader>
          <Title>System Monitor</Title>
      </WidgetHeader>
      <WidgetContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">CPU</span>
            </div>
            <span className="text-sm font-bold tabular-nums">
              {currentCpu}%
            </span>
          </div>
          <ChartContainer config={chartConfig} className="h-[120px] w-full">
            <AreaChart
              data={cpuData}
              margin={{
                left: 0,
                right: 0,
                top: 5,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-cpu)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-cpu)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              {/* <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tick={false}
              /> */}
              {/* <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10 }}
                width={22}
              /> */}
              <ChartTooltip
                content={<ChartTooltipContent indicator="line" />}
                cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1 }}
              />
              <Area
                type="monotone"
                dataKey="cpu"
                stroke="var(--color-cpu)"
                strokeWidth={2}
                fill="url(#cpuGradient)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ChartContainer>
        </div>

        {/* Memory Usage Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MemoryStick className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Memory</span>
          </div>
          {memoryData.map((memory) => (
            <div key={memory.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{memory.label}</span>
                <span className="text-muted-foreground font-medium tabular-nums">
                  {memory.used.toFixed(1)} / {memory.total} GB
                </span>
              </div>
              <div className="relative">
                <Progress 
                  value={memory.percentage} 
                  className="h-3"
                  style={{
                    // @ts-ignore
                    '--progress-background': memory.color,
                  }}
                />
                {/* <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-primary-foreground mix-blend-difference">
                  {memory.percentage.toFixed(1)}%
                </span> */}
              </div>
            </div>
          ))}
        </div>
      </WidgetContent>
    </Widget>
  )
}
