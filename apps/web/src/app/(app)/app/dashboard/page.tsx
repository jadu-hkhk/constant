"use client"

import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { AddWebsiteForm } from "@/components/dashboard.tsx/add-website-form"
import { DashboardHeader } from "@/components/dashboard.tsx/dashboard-header"
import { Stats } from "@/components/dashboard.tsx/stats"
import { WebsiteList } from "@/components/dashboard.tsx/website-list"
import { Card } from "@/components/ui/card"
import type { WebsiteData } from "@/lib/types"
import { BACKEND_URL } from "@/lib/utils"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [websites, setWebsites] = useState<WebsiteData[]>([])

  const fetchWebsites = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(`${BACKEND_URL}/website/all`, { withCredentials: true })
      setWebsites(data.websites as WebsiteData[])
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message)
      } else {
        toast.error("Internal server error")
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // fetch websites on mount
  useEffect(() => {
    fetchWebsites()
  }, [fetchWebsites])

  useEffect(() => {
    const interval = setInterval(
      () => {
        fetchWebsites()
      },
      3 * 60 * 1000,
    )
    return () => clearInterval(interval)
  }, [fetchWebsites])

  return (
    <div className="min-h-screen bg-background pt-16">
      <DashboardHeader refreshWebsites={fetchWebsites} isLoading={isLoading} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Stats websites={websites} />
        <Card className="p-6 glass border-brand-primary/20 mb-8">
          <h2 className="text-xl font-semibold text-white md:mb-4">Add New Website</h2>
          <AddWebsiteForm setWebsites={setWebsites} />
        </Card>
        <WebsiteList websites={websites} />
      </div>
    </div>
  )
}
