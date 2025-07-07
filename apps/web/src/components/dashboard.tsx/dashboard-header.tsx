import { Bell, Settings } from "lucide-react"
import { Button } from "../ui/button"

export function DashboardHeader() {
  return (
    <div className="border-b border-brand-primary/20 bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">Monitor your websites and get instant alerts</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-white/5">
              <Bell className="w-4 h-4 mr-2" />
              Alerts
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-white/5">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
