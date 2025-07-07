import { motion } from "framer-motion"
import { Play } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTAButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
    >
      <Button
        asChild
        size="lg"
        className="px-8 py-6 text-lg bg-brand-primary hover:bg-brand-primary/90 text-white transform hover:scale-105 transition-all duration-200 shadow-lg shadow-brand-primary/25"
      >
        <Link href="/signup">Start Monitoring Free</Link>
      </Button>
      <Button
        size="lg"
        variant="ghost"
        className="px-8 py-6 text-lg border border-gray-600 hover:bg-white/5 backdrop-blur-sm hover:scale-105 transition-all duration-200"
      >
        <Play className="w-5 h-5 mr-2" />
        View Demo
      </Button>
    </motion.div>
  )
}
