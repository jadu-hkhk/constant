"use client"

import axios from "axios"
import { motion } from "framer-motion"
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  Globe,
  RefreshCw,
  Trash,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BACKEND_URL, cn } from "@/lib/utils"

interface WebsiteHeaderProps {
  website?: {
    id: string
    url: string
    status: "UP" | "DOWN" | "UNKNOWN"
    region: string
    createdAt: string
  }
  isLoading: boolean
  handleRefreshWebsiteTicks: () => void
}

export function WebsiteHeader({
  website,
  isLoading,
  handleRefreshWebsiteTicks,
}: WebsiteHeaderProps) {
  const router = useRouter()
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleDeleteWebsite = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/website/${website?.id}`, { withCredentials: true })
      router.push("/app/dashboard")
      toast.success("Website deleted successfully")
    } catch {
      toast.error("Error deleting website")
    }
  }

  return (
    <div className="mb-6 sm:mb-8">
      <BackToDashboard />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
        <div className="flex-1">
          <div className="flex flex-row items-center space-x-4 mb-4 gap-0">
            <motion.div
              animate={website?.status === "UP" ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <WebsiteStatusIcon status={website?.status ?? "UNKNOWN"} />
            </motion.div>
            <WebsiteUrl website={website} />
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
            <WebsiteStatusBadge status={website?.status ?? "UNKNOWN"} />

            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Globe className="w-4 h-4" />
              <span>{website?.region ?? "N/A"}</span>
            </div>

            <div className="text-sm text-gray-400">
              Monitoring since{" "}
              <span className="font-bold">{formatDate(website?.createdAt ?? "")}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-4">
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-white/5 cursor-pointer w-full sm:w-auto"
            onClick={handleRefreshWebsiteTicks}
          >
            <RefreshCw
              className={cn("w-4 h-4 mr-2", {
                "animate-spin": isLoading,
              })}
            />
            Refresh
          </Button>

          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-white/5 cursor-pointer text-red-400 hover:text-red-500 w-full sm:w-auto"
            onClick={handleDeleteWebsite}
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

function BackToDashboard() {
  return (
    <Link
      href="/app/dashboard"
      className="inline-flex items-center text-gray-400 hover:text-brand-primary transition-colors duration-200 mb-4 sm:mb-6 text-sm sm:text-base"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Dashboard
    </Link>
  )
}

function WebsiteStatusIcon({ status }: { status: "UP" | "DOWN" | "UNKNOWN" }) {
  return status === "UP" ? (
    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-status-success" />
  ) : status === "DOWN" ? (
    <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-status-error" />
  ) : (
    <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-status-warning" />
  )
}

function WebsiteStatusBadge({ status }: { status: "UP" | "DOWN" | "UNKNOWN" }) {
  return (
    <Badge
      variant={status === "UP" ? "default" : "destructive"}
      className={cn("px-2 sm:px-3 py-1 text-xs sm:text-sm", {
        "bg-status-success/20 text-status-success border-status-success/30": status === "UP",
        "bg-status-error/20 text-status-error border-status-error/30": status === "DOWN",
        "bg-status-warning/20 text-status-warning border-status-warning/30 animate-pulse":
          status === "UNKNOWN",
      })}
    >
      {status === "UP" ? "Online" : status === "DOWN" ? "Offline" : "Pending"}
    </Badge>
  )
}

function WebsiteUrl({ website }: { website?: { url: string } }) {
  return (
    <div className="min-w-0 flex-1">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white break-all sm:break-words">
        {website?.url}
      </h1>
      <div className="flex items-center space-x-2 mt-1">
        <a
          href={website?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-brand-primary transition-colors flex items-center text-sm sm:text-base break-all sm:break-words"
        >
          <span className="truncate">{website?.url}</span>
          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1 flex-shrink-0" />
        </a>
      </div>
    </div>
  )
}
