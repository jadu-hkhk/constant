"use client"

import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, AlertTriangle, CheckCircle, Clock, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface TicksHistoryProps {
  ticks: {
    id: string
    status: "UP" | "DOWN" | "UNKNOWN"
    responseTimeMs: number
    createdAt: string
    region: { name: string; code: string }
    statusCode: number
    error: string | null
  }[]
}

export function TicksHistory({ ticks }: TicksHistoryProps) {
  return (
    <Card className="glass border-brand-primary/20">
      <div className="p-4 sm:p-6 border-b border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">Recent Checks</h2>
          <Badge className="bg-brand-primary/20 text-brand-primary border-brand-primary/30 w-fit">
            Last {ticks?.length} checks
          </Badge>
        </div>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Detailed history of the most recent monitoring checks
        </p>
      </div>

      <div className="divide-y divide-gray-700">
        <AnimatePresence>
          {ticks?.map((tick, index) => (
            <motion.div
              key={tick?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="p-4 sm:p-6 hover:bg-white/5 transition-all duration-300 group"
            >
              <Tick tick={tick} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {ticks?.length === 0 && <NoChecksYet />}
    </Card>
  )
}

function Tick({ tick }: { tick: TicksHistoryProps["ticks"][number] }) {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const getStatusBadge = (status: "UP" | "DOWN" | "UNKNOWN", statusCode: number) => {
    if (status === "UP") {
      return (
        <Badge className="bg-status-success/20 text-status-success border-status-success/30 text-xs sm:text-sm">
          Online
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-status-error/20 text-status-error border-status-error/30 text-xs sm:text-sm">
          {statusCode ? `Error ${statusCode}` : "Offline"}
        </Badge>
      )
    }
  }
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="flex items-start lg:items-center space-x-3 flex-1">
        <div className="flex items-start lg:items-center space-x-3 min-w-0 flex-1">
          <motion.div
            animate={tick?.status === "UP" ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex-shrink-0"
          >
            {tick?.status === "UP" ? (
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-status-success" />
            ) : (
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-status-error" />
            )}
          </motion.div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              {getStatusBadge(tick?.status, tick?.statusCode)}
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 -translate-x-7 sm:-translate-x-0">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{formatTime(tick?.createdAt)}</span>
              </div>
            </div>
            {tick?.error && (
              <div className="flex items-start space-x-2 mt-2">
                <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-status-warning flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-status-warning break-words">
                  {tick?.error}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between lg:justify-end space-x-4 lg:space-x-8 text-xs sm:text-sm">
        <div className="text-center">
          <p className="text-white font-semibold text-base sm:text-lg">
            {tick?.responseTimeMs > 0 ? `${tick.responseTimeMs}ms` : "N/A"}
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">Response Time</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1">
            <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            {/* <span className="text-white font-semibold">{tick?.region?.name}</span> */}
            <span className="text-white font-semibold text-base sm:text-lg">India</span>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm">Region</p>
        </div>
        <div className="text-center">
          {/* <p className="text-white font-semibold">{tick?.statusCode || "N/A"}</p> */}
          <p className="text-white font-semibold text-base sm:text-lg">
            {tick?.status === "UP" ? "200" : "500"}
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">Status Code</p>
        </div>
      </div>
    </div>
  )
}

function NoChecksYet() {
  return (
    <div className="p-8 sm:p-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Clock className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-4 sm:mb-6" />
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-400 mb-2 sm:mb-3">
          No checks yet
        </h3>
        <p className="text-gray-500 text-base sm:text-lg">
          Monitoring data will appear here once checks begin
        </p>
      </motion.div>
    </div>
  )
}
