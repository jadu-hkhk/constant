import { type Prisma, prisma } from "@repo/db"
import type { Request, Response } from "express"

export const createWebsite = async (req: Request, res: Response) => {
  const { url } = req.body

  try {
    const website = await prisma.website.create({
      data: {
        url,
        userId: req.userId as string,
      },
    })
    res.status(201).json({
      id: website.id,
    })
  } catch (e) {
    if ((e as Prisma.PrismaClientKnownRequestError).code === "P2002") {
      res.status(409).json({
        message: "Website already exists",
      })
      return
    }
    res.status(500).json({ message: "Internal server error" })
  }
}

export const getWebsiteStatus = async (req: Request, res: Response) => {
  const { websiteId } = req.params

  const website = await prisma.website.findUnique({
    where: {
      id: websiteId,
      userId: req.userId as string,
    },
    include: {
      ticks: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
        include: {
          region: true,
        },
      },
    },
  })

  if (!website) {
    res.status(404).json({
      message: "Website not found",
    })
    return
  }

  res.status(200).json({
    status: website.ticks[0]?.status,
    responseTimeMs: website.ticks[0]?.responseTimeMs,
    region: website.ticks[0]?.region.name,
  })
}
