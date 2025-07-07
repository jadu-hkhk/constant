import { Activity } from "lucide-react"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
        <Activity className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-bold text-white">Constant</span>
    </Link>
  )
}
