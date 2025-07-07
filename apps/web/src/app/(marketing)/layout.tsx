import { Footer } from "@/components/layout/footer"
import { MarketingHeader } from "@/components/layout/marketing-header"

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingHeader />
      {children}
      <Footer />
    </>
  )
}
