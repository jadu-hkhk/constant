import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function StatusBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <Badge
        variant="outline"
        className="px-4 py-2 bg-status-success/10 border-status-success/20 text-status-success backdrop-blur-sm"
      >
        <CheckCircle className="w-4 h-4 mr-2" />
        All Systems Operational
      </Badge>
    </motion.div>
  )
}
