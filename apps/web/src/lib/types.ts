export type WebsiteData = {
  id: string
  url: string
  status: "UP" | "DOWN" | "PENDING"
  responseTime: number
  lastCheck: string
  region: string
}
