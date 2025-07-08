import { motion } from "framer-motion"
import { AlertCircle, CheckCircle, ExternalLink, Globe, Loader2 } from "lucide-react"
import Link from "next/link"
import type { WebsiteData } from "@/lib/types"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card } from "../ui/card"

type WebsiteListProps = {
  websites: WebsiteData[]
}

export function WebsiteList({ websites }: WebsiteListProps) {
  return (
    <Card className="glass border-brand-primary/20">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Monitored Websites</h2>
      </div>

      <div className="divide-y divide-gray-700">
        {websites.map((website, index) => (
          <motion.div
            key={website.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-6 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {website.status === "UP" ? (
                    <CheckCircle className="w-5 h-5 text-status-success" />
                  ) : website.status === "DOWN" ? (
                    <AlertCircle className="w-5 h-5 text-status-error" />
                  ) : (
                    <Loader2 className="w-5 h-5 text-status-warning animate-spin" />
                  )}
                  <span className="font-medium text-white">{website.url}</span>
                </div>
                <Badge
                  variant={website.status === "UP" ? "default" : "destructive"}
                  className={
                    website.status === "UP"
                      ? "bg-status-success/20 text-status-success border-status-success/30"
                      : website.status === "DOWN"
                        ? "bg-status-error/20 text-status-error border-status-error/30"
                        : "bg-status-warning/20 text-status-warning border-status-warning/30"
                  }
                >
                  {website.status === "UP"
                    ? "Online"
                    : website.status === "DOWN"
                      ? "Offline"
                      : "Pending"}
                </Badge>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="text-center">
                  <p className="text-white font-medium">
                    {website.responseTime > 0 ? `${website.responseTime}ms` : "N/A"}
                  </p>
                  <p>Response Time</p>
                </div>
                <div className="text-center">
                  {website.region ? (
                    <p className="text-white font-medium">{website.region}</p>
                  ) : (
                    <span className="text-sm text-gray-400">N/A</span>
                  )}
                  <p>Region</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-medium">
                    {website.lastCheck ? (
                      <span className="flex flex-col">
                        <span className="text-sm text-white">
                          {new Date(website.lastCheck).toLocaleString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                        <span className="text-sm text-white/80">
                          {new Date(website.lastCheck).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">N/A</span>
                    )}
                  </p>
                  <p>Last Check</p>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-gray-400 group">
                  <Link
                    href={`/app/website/${website.id}`}
                    className="flex flex-col items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4 group-hover:text-white transition-all duration-300" />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-all duration-300">
                      More Info
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {websites.length === 0 && (
        <div className="p-12 text-center">
          <Globe className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">No websites yet</h3>
          <p className="text-gray-500">Add your first website to start monitoring</p>
        </div>
      )}
    </Card>
  )
}
