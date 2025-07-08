"use client"

import axios from "axios"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { ResponseTimeChart } from "@/components/website/response-time-chart"
import { TicksHistory } from "@/components/website/ticks-history"
import { WebsiteHeader } from "@/components/website/website-header"
import { WebsiteStats } from "@/components/website/website-stats"
import { BACKEND_URL } from "@/lib/utils"

type WebsiteDetails = {
  id: string
  url: string
  status: "UP" | "DOWN" | "UNKNOWN"
  createdAt: string
  region: string
}

type Tick = {
  id: string
  status: "UP" | "DOWN" | "UNKNOWN"
  responseTimeMs: number
  createdAt: string
  region: { name: string; code: string }
  statusCode: number
  error: string | null
}

export default function WebsitePage() {
  const params = useParams()
  const websiteId = params.websiteId as string

  const [website, setWebsite] = useState<WebsiteDetails | null>(null)
  const [ticks, setTicks] = useState<Tick[] | null>(null)

  const fetchWebsiteData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/website/details/${websiteId}`, {
        withCredentials: true,
      })
      setWebsite(data)
    } catch (error) {
      console.error("Error fetching website data:", error)
    }
  }, [websiteId])

  const fetchTicksData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/website/ticks/${websiteId}`, {
        withCredentials: true,
      })
      setTicks(data.ticks)
    } catch (error) {
      console.error("Error fetching ticks data:", error)
    }
  }, [websiteId])

  useEffect(() => {
    fetchWebsiteData()
    fetchTicksData()
  }, [fetchWebsiteData, fetchTicksData])

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <WebsiteHeader website={website ?? undefined} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <WebsiteStats ticks={ticks ?? []} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <ResponseTimeChart ticks={ticks ?? []} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <TicksHistory ticks={ticks ?? []} />
        </motion.div>
      </div>
    </div>
  )
}
