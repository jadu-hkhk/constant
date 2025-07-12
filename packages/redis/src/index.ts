import type { WebsiteEvent, XReadGroupResponse } from "@repo/shared"
import { createClient } from "redis"

const redisClient = createClient({
  url: process.env.REDIS_URL,
})

redisClient
  .connect()
  .then(() => {
    console.log("Redis connected")
  })
  .catch(e => {
    console.log("Redis error", e)
    process.exit(1)
  })

const STREAM_NAME = "constant:website"

const xAdd = async ({ url, id }: WebsiteEvent) => {
  await redisClient.xAdd(STREAM_NAME, "*", {
    url,
    id,
  })
}

export const xAddBulk = async (websites: WebsiteEvent[]) => {
  for (const { url, id } of websites) {
    await xAdd({ url, id })
  }
}

export const xReadGroup = async (group: string, consumer: string): Promise<XReadGroupResponse> => {
  const res = await redisClient.xReadGroup(
    group,
    consumer,
    {
      key: STREAM_NAME,
      id: ">",
    },
    {
      COUNT: 5,
      BLOCK: 0,
    },
  )

  return (res as XReadGroupResponse) ?? []
}

export const xAckBulk = async (group: string, ids: string[]) => {
  await redisClient.xAck(STREAM_NAME, group, ids)
}
