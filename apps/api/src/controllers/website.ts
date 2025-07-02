import { prisma } from "@repo/db"
import type { Request, Response } from "express"

export const createWebsite = async (req: Request, res: Response) => {
  const { url } = req.body

  if (!url) {
    res.status(400).json({
      message: "URL is required",
    })
    return
  }
  const website = await prisma.website.create({
    data: {
      url,
    },
  })
  res.status(201).json({
    id: website.id,
  })
}

export const getWebsiteStatus = (_req: Request, res: Response) => {
  res.json({
    message: "Website status",
  })
}
