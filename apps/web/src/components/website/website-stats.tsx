"use client"

import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"

interface WebsiteStatsProps {
  ticks: {
    status: "UP" | "DOWN" | "UNKNOWN"
    responseTimeMs: number
    createdAt: string
  }[]
}

export function WebsiteStats({ ticks }: WebsiteStatsProps) {
  const upTicks = ticks?.filter(tick => tick?.status === "UP").length
  const downTicks = ticks?.filter(tick => tick?.status === "DOWN").length
  const avgResponseTime = Math.round(
    ticks
      .filter(tick => tick?.status === "UP")
      .reduce((acc, tick) => acc + tick.responseTimeMs, 0) /
      ticks?.filter(tick => tick?.status === "UP").length,
  )
  const uptimePercentage = Math.round((upTicks / ticks?.length) * 100)

  const stats = [
    {
      title: "Current Response Time",
      value: `${ticks?.[0]?.responseTimeMs ?? 0}ms`,
      icon: Clock,
      color: "text-brand-accent",
      bgColor: "from-brand-accent/20 to-brand-accent/5",
      change: "Last check",
    },
    {
      title: "Average Response Time",
      value: `${avgResponseTime ?? 0}ms`,
      icon: TrendingUp,
      color: "text-brand-primary",
      bgColor: "from-brand-primary/20 to-brand-primary/5",
      change: "Last 10 checks",
    },
    {
      title: "Uptime (Last 10 checks)",
      value: `${uptimePercentage ?? 0}%`,
      icon: CheckCircle,
      color: "text-status-success",
      bgColor: "from-status-success/20 to-status-success/5",
      change: `${upTicks}/${ticks?.length} successful`,
    },
    {
      title: "Failed Checks",
      value: downTicks ?? 0,
      icon: AlertTriangle,
      color: "text-status-error",
      bgColor: "from-status-error/20 to-status-error/5",
      change: "Last 10 checks",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -4 }}
        >
          <Card
            className={`p-4 sm:p-6 glass border-brand-primary/20 hover:border-brand-primary/40 transition-all duration-300 bg-gradient-to-br ${stat.bgColor}`}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-xs sm:text-sm font-medium truncate">
                  {stat.title}
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white truncate">
                  {stat.value}
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-xl bg-white/5 ${stat.color} flex-shrink-0 ml-2`}>
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
            </div>
            <p className="text-xs text-gray-500 truncate">{stat.change}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
