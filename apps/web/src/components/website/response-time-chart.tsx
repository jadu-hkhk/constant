"use client"

import { Clock } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"

interface ResponseTimeChartProps {
  ticks: Array<{
    id: string
    responseTimeMs: number
    createdAt: string
    status: string
  }>
}

export function ResponseTimeChart({ ticks }: ResponseTimeChartProps) {
  if (ticks.length === 0) return null

  const chartData = ticks
    .slice()
    .reverse()
    .map(tick => ({
      time: new Date(tick.createdAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      responseTime: tick.status === "UP" ? tick.responseTimeMs : 0,
      status: tick.status,
    }))

  return (
    <Card className="p-4 sm:p-6 glass border-brand-primary/20">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-white">Response Time</h3>
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>Last 10 checks</span>
        </div>
      </div>
      <div className="h-48 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              interval="preserveStartEnd"
              minTickGap={20}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              domain={["dataMin - 10", "dataMax + 10"]}
              width={40}
              tickFormatter={(value: number) => `${value}ms`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(30, 28, 33, 0.9)",
                border: "1px solid rgba(226, 115, 150, 0.2)",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "12px",
              }}
              formatter={(value: number) => [value ? `${value}ms` : "Down", "Response Time"]}
            />
            <Line
              type="monotone"
              dataKey="responseTime"
              stroke="hsl(var(--brand-primary))"
              strokeWidth={2}
              dot={(props: { cx: number; cy: number; payload: { status: string } }) => {
                const { cx, cy, payload } = props
                return (
                  <circle
                    key={cx}
                    cx={cx}
                    cy={cy}
                    r={3}
                    fill={
                      payload.status === "UP"
                        ? "hsl(var(--brand-primary))"
                        : "hsl(var(--status-error))"
                    }
                    strokeWidth={1}
                    stroke={
                      payload.status === "UP"
                        ? "hsl(var(--brand-primary))"
                        : "hsl(var(--status-error))"
                    }
                  />
                )
              }}
              activeDot={{ r: 4, fill: "hsl(var(--brand-primary))" }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
