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
      <div className="p-4 sm:p-6 border-b border-gray-700">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Monitored Websites</h2>
      </div>

      <div className="divide-y divide-gray-700">
        {websites.map((website, index) => (
          <motion.div
            key={website.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 sm:p-6 hover:bg-white/5 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  {website.status === "UP" ? (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-success flex-shrink-0" />
                  ) : website.status === "DOWN" ? (
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-error flex-shrink-0" />
                  ) : (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-status-warning animate-spin flex-shrink-0" />
                  )}
                  <span className="font-medium text-white truncate">{website.url}</span>
                </div>
                <Badge
                  variant={website.status === "UP" ? "default" : "destructive"}
                  className={
                    website.status === "UP"
                      ? "bg-status-success/20 text-status-success border-status-success/30 text-xs sm:text-sm"
                      : website.status === "DOWN"
                        ? "bg-status-error/20 text-status-error border-status-error/30 text-xs sm:text-sm"
                        : "bg-status-warning/20 text-status-warning border-status-warning/30 text-xs sm:text-sm"
                  }
                >
                  {website.status === "UP"
                    ? "Online"
                    : website.status === "DOWN"
                      ? "Offline"
                      : "Pending"}
                </Badge>
              </div>

              <div className="flex items-center justify-between sm:justify-end space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-400">
                <div className="text-center">
                  <p className="text-white font-medium">
                    {website.responseTime > 0 ? `${website.responseTime}ms` : "N/A"}
                  </p>
                  <p className="hidden sm:block">Response Time</p>
                  <p className="sm:hidden text-xs">Response Time</p>
                </div>
                <div className="text-center">
                  {website.region ? (
                    <p className="text-white font-medium">{website.region}</p>
                  ) : (
                    <span className="text-sm text-gray-400">N/A</span>
                  )}
                  <p className="hidden sm:block">Region</p>
                  <p className="sm:hidden text-xs">Region</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-medium">
                    {website.lastCheck ? (
                      <>
                        {/* Mobile */}
                        <span className="sm:hidden text-xs text-white">
                          {new Date(website.lastCheck).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                        {/* Desktop */}
                        <span className="hidden sm:flex flex-col">
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
                      </>
                    ) : (
                      <span className="text-sm text-gray-400">N/A</span>
                    )}
                  </p>
                  <p className="hidden sm:block">Last Check</p>
                  <p className="sm:hidden text-xs">Last Check</p>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-gray-400 group">
                  <Link
                    href={`/app/website/${website.id}`}
                    className="flex flex-col items-center gap-1 sm:gap-2"
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 group-hover:text-white transition-all duration-300" />
                    <span className="text-xs sm:text-sm text-gray-400 group-hover:text-white transition-all duration-300">
                      More
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {websites.length === 0 && (
        <div className="p-8 sm:p-12 text-center">
          <Globe className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-400 mb-2">No websites yet</h3>
          <p className="text-sm sm:text-base text-gray-500">
            Add your first website to start monitoring
          </p>
        </div>
      )}
    </Card>
  )
}
