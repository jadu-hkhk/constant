import { AlertCircle, CheckCircle, Globe, TrendingUp } from "lucide-react"
import type { WebsiteData } from "@/lib/types"
import { Card } from "../ui/card"

export function Stats({ websites }: { websites: WebsiteData[] }) {
  const upWebsites = websites.filter(w => w.status === "UP").length
  const downWebsites = websites.filter(w => w.status === "DOWN").length
  const avgResponseTime = Math.round(
    websites.filter(w => w.status === "UP").reduce((acc, w) => acc + w.responseTime, 0) /
      websites.filter(w => w.status === "UP").length,
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="p-6 glass border-brand-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Websites</p>
            <p className="text-2xl font-bold text-white">{websites.length}</p>
          </div>
          <Globe className="w-8 h-8 text-brand-primary" />
        </div>
      </Card>

      <Card className="p-6 glass border-brand-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Online</p>
            <p className="text-2xl font-bold text-status-success">{upWebsites}</p>
          </div>
          <CheckCircle className="w-8 h-8 text-status-success" />
        </div>
      </Card>

      <Card className="p-6 glass border-brand-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Offline</p>
            <p className="text-2xl font-bold text-status-error">{downWebsites}</p>
          </div>
          <AlertCircle className="w-8 h-8 text-status-error" />
        </div>
      </Card>

      <Card className="p-6 glass border-brand-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Avg Response</p>
            <p className="text-2xl font-bold text-white">{avgResponseTime}ms</p>
          </div>
          <TrendingUp className="w-8 h-8 text-brand-accent" />
        </div>
      </Card>
    </div>
  )
}
