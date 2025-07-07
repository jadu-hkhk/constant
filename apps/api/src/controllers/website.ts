import { type Prisma, prisma } from "@repo/db"
import type { Request, Response } from "express"

export const createWebsite = async (req: Request, res: Response) => {
  const { url } = req.body

  try {
    const website = await prisma.website.findUnique({
      where: {
        url,
      },
      include: {
        users: true,
      },
    })

    if (website) {
      if (website.users.some((user: { id: string }) => user.id === req.userId)) {
        res.status(409).json({
          message: "Website already exists",
        })
        return
      }

      const updatedWebsite = await prisma.website.update({
        where: {
          id: website.id,
        },
        data: {
          users: {
            connect: {
              id: req.userId as string,
            },
          },
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
      res.status(201).json({
        id: updatedWebsite.id,
        url: updatedWebsite.url,
        status: updatedWebsite?.ticks[0]?.status,
        responseTime: updatedWebsite?.ticks[0]?.responseTimeMs,
        lastCheck: updatedWebsite?.ticks[0]?.createdAt,
        region: updatedWebsite?.ticks[0]?.region?.name,
      })
      return
    }
  } catch (_e) {
    res.status(500).json({ message: "Internal server error" })
    return
  }

  try {
    const website = await prisma.website.create({
      data: {
        url,
        users: {
          connect: {
            id: req.userId as string,
          },
        },
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
    res.status(201).json({
      id: website.id,
      url: website.url,
      status: website.ticks[0]?.status,
      responseTime: website.ticks[0]?.responseTimeMs,
      lastCheck: website.ticks[0]?.createdAt,
      region: website.ticks[0]?.region?.name,
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

  try {
    const website = await prisma.website.findFirst({
      where: {
        id: websiteId,
        users: {
          some: {
            id: req.userId as string,
          },
        },
      },
      include: {
        ticks: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
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
      id: website.id,
      url: website.url,
      createdAt: website.createdAt,
      last10Ticks: website.ticks,
    })
  } catch (_e) {
    res.status(500).json({ message: "Internal server error" })
  }
}
