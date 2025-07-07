import { MarketingHeader } from "@/components/layout/marketing-header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MarketingHeader />
      {children}
    </div>
  )
}
