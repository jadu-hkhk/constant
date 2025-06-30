import type { Request, Response } from "express"

export const createWebsite = (_req: Request, res: Response) => {
  res.json({
    message: "Website created",
  })
}

export const getWebsiteStatus = (_req: Request, res: Response) => {
  res.json({
    message: "Website status",
  })
}
