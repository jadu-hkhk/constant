import "dotenv/config"
import { prisma } from "@repo/db"
import { xAckBulk, xReadGroup } from "@repo/redis"
import type { WebsiteEvent } from "@repo/shared"
import axios from "axios"

const regionId = process.env.REGION_ID
const workerId = process.env.WORKER_ID

if (!regionId || !workerId) {
  throw new Error("REGION_ID and WORKER_ID must be set")
}

async function main() {
  const region = await prisma.region.findUnique({
    where: {
      id: regionId,
    },
  })
  if (!region) {
    throw new Error("REGION_ID is not valid")
  }

  while (true) {
    const response = await xReadGroup(regionId!, workerId!)
    const websites: WebsiteEvent[] = response[0]?.messages.map(m => m.message) ?? []

    const promises = websites.map(async website => processWebsite(website))
    await Promise.all(promises)

    await xAckBulk(regionId!, response[0]?.messages.map(m => m.id) ?? [])
    console.log("Processed websites", websites.length)
  }
}

async function processWebsite(website: WebsiteEvent) {
  const { id, url } = website

  try {
    const startTime = Date.now()
    await axios.get(url, { timeout: 15 * 1000 })
    const endTime = Date.now()
    const duration = endTime - startTime

    // TODO: after processing the websites, when storng the result in db
    // TODO: it should be routed through a queue and then into db in a bulk db operation

    await prisma.websiteTick.create({
      data: {
        responseTimeMs: duration,
        status: "UP",
        websiteId: id,
        regionId: regionId as string,
      },
    })
  } catch (_e) {
    await prisma.websiteTick.create({
      data: {
        responseTimeMs: 0,
        websiteId: id,
        regionId: regionId as string,
        status: "DOWN",
      },
    })
  }
}

main()
