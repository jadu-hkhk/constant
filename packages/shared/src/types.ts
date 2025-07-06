export type XReadGroupResponse = {
  name: string // Stream name
  messages: {
    id: string // Message id
    message: WebsiteEvent
  }[]
}[]

export type WebsiteEvent = {
  id: string // Website id
  url: string // Website url
}
