"use client"

import { motion } from "framer-motion"
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  Globe,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface WebsiteHeaderProps {
  website?: {
    id: string
    url: string
    status: "UP" | "DOWN" | "UNKNOWN"
    region: string
    createdAt: string
  }
}

export function WebsiteHeader({ website }: WebsiteHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="mb-8">
      <BackToDashboard />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            <motion.div
              animate={website?.status === "UP" ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <WebsiteStatusIcon status={website?.status ?? "UNKNOWN"} />
            </motion.div>
            <WebsiteUrl website={website} />
          </div>

          <div className="flex flex-wrap items-center gap-4">
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

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-white/5">
            <Settings className="w-4 h-4 mr-2" />
            Edit
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
      className="inline-flex items-center text-gray-400 hover:text-brand-primary transition-colors duration-200 mb-6"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Dashboard
    </Link>
  )
}

function WebsiteStatusIcon({ status }: { status: "UP" | "DOWN" | "UNKNOWN" }) {
  return status === "UP" ? (
    <CheckCircle className="w-8 h-8 text-status-success" />
  ) : status === "DOWN" ? (
    <AlertCircle className="w-8 h-8 text-status-error" />
  ) : (
    <AlertTriangle className="w-8 h-8 text-status-warning" />
  )
}

function WebsiteStatusBadge({ status }: { status: "UP" | "DOWN" | "UNKNOWN" }) {
  return (
    <Badge
      variant={status === "UP" ? "default" : "destructive"}
      className={cn("px-3 py-1", {
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
    <div>
      <h1 className="text-3xl font-bold text-white">{website?.url}</h1>
      <div className="flex items-center space-x-2 mt-1">
        <a
          href={website?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-brand-primary transition-colors flex items-center"
        >
          {website?.url}
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  )
}
