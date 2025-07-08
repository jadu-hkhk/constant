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
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Recent Checks</h2>
          <Badge className="bg-brand-primary/20 text-brand-primary border-brand-primary/30">
            Last {ticks?.length} checks
          </Badge>
        </div>
        <p className="text-gray-400 mt-2">Detailed history of the most recent monitoring checks</p>
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
              className="p-6 hover:bg-white/5 transition-all duration-300 group"
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
        <Badge className="bg-status-success/20 text-status-success border-status-success/30">
          Online
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-status-error/20 text-status-error border-status-error/30">
          {statusCode ? `Error ${statusCode}` : "Offline"}
        </Badge>
      )
    }
  }
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4 flex-1">
        <div className="flex items-center space-x-3">
          <motion.div
            animate={tick?.status === "UP" ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {tick?.status === "UP" ? (
              <CheckCircle className="w-6 h-6 text-status-success" />
            ) : (
              <AlertCircle className="w-6 h-6 text-status-error" />
            )}
          </motion.div>
          <div>
            <div className="flex items-center space-x-3">
              {getStatusBadge(tick?.status, tick?.statusCode)}
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{formatTime(tick?.createdAt)}</span>
              </div>
            </div>
            {tick?.error && (
              <div className="flex items-center space-x-2 mt-2">
                <AlertTriangle className="w-4 h-4 text-status-warning" />
                <span className="text-sm text-status-warning">{tick?.error}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-8 text-sm">
        <div className="text-center">
          <p className="text-white font-semibold text-lg">
            {tick?.responseTimeMs > 0 ? `${tick.responseTimeMs}ms` : "N/A"}
          </p>
          <p className="text-gray-400">Response Time</p>
        </div>
        <div className="text-center">
          <div className="flex items-center space-x-1">
            <Globe className="w-4 h-4 text-gray-400" />
            {/* <span className="text-white font-semibold">{tick?.region?.name}</span> */}
            <span className="text-white font-semibold">India</span>
          </div>
          <p className="text-gray-400">Region</p>
        </div>
        <div className="text-center">
          {/* <p className="text-white font-semibold">{tick?.statusCode || "N/A"}</p> */}
          <p className="text-white font-semibold">{tick?.status === "UP" ? "200" : "500"}</p>
          <p className="text-gray-400">Status Code</p>
        </div>
      </div>
    </div>
  )
}

function NoChecksYet() {
  return (
    <div className="p-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Clock className="w-16 h-16 text-gray-600 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold text-gray-400 mb-3">No checks yet</h3>
        <p className="text-gray-500 text-lg">Monitoring data will appear here once checks begin</p>
      </motion.div>
    </div>
  )
}
