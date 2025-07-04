import { prisma } from "@repo/db"
import jwt from "jsonwebtoken"
import request from "supertest"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { app } from ".."

vi.mock("@repo/db")
vi.mock("jsonwebtoken")

describe("Website API", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(jwt.verify).mockImplementation(() => ({ userId: "123" }))
  })

  describe("POST /api/v1/website", () => {
    describe("Authentication", () => {
      it("should not create a website if the user is not authenticated", async () => {
        const response = await request(app).post("/api/v1/website").send({})

        expect(response.status).toBe(401)
        expect(response.body.message).toBe("Unauthorized")
      })
    })

    describe("Validation", () => {
      it("should not create a website if the url is missing", async () => {
        const response = await request(app)
          .post("/api/v1/website")
          .set("Cookie", "token=123")
          .send({})

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Validation error")
        expect(response.body.errors).toEqual({
          url: ["Required"],
        })
      })

      it("should not create a website if the url is invalid", async () => {
        const response = await request(app)
          .post("/api/v1/website")
          .set("Cookie", "token=123")
          .send({ url: "invalid-url" })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Validation error")
        expect(response.body.errors).toEqual({
          url: ["Invalid URL"],
        })
      })
    })

    describe("Success", () => {
      it("should create a website if the url is valid", async () => {
        const mockWebsite = {
          id: "12345",
          url: "https://www.google.com",
          timeAdded: new Date(),
          userId: "123",
        }

        vi.mocked(prisma.website.create).mockResolvedValue(mockWebsite)
        vi.spyOn(prisma.website, "create")

        const response = await request(app)
          .post("/api/v1/website")
          .set("Cookie", "token=123")
          .send({ url: "https://www.google.com" })

        expect(response.status).toBe(201)
        expect(prisma.website.create).toHaveBeenCalledWith({
          data: {
            url: "https://www.google.com",
            userId: "123",
          },
        })
      })
    })

    describe("Error", () => {
      it("should return 409 if the website already exists", async () => {
        vi.mocked(prisma.website.create).mockRejectedValue({
          code: "P2002",
        })

        const response = await request(app)
          .post("/api/v1/website")
          .set("Cookie", "token=123")
          .send({ url: "https://www.google.com" })

        expect(response.status).toBe(409)
        expect(response.body.message).toBe("Website already exists")
      })
    })
  })

  describe("GET /api/v1/website/status/:websiteId", () => {
    const websiteID = "cmcnhxhgx000008jyc1rf0iyp"

    describe("Authentication", () => {
      it("should not get the website status if the user is not authenticated", async () => {
        const response = await request(app).get(`/api/v1/website/status/${websiteID}`)

        expect(response.status).toBe(401)
        expect(response.body.message).toBe("Unauthorized")
      })
    })

    describe("Validation", () => {
      it("should not get the website status if the websiteId is invalid", async () => {
        const response = await request(app)
          .get(`/api/v1/website/status/invalid-website-id`)
          .set("Cookie", "token=123")

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Validation error")
        expect(response.body.errors).toEqual({
          websiteId: ["Invalid website ID"],
        })
      })
    })

    describe("Success", () => {
      it("should get the website status if the user is authenticated and the website exists", async () => {
        const mockWebsite = {
          id: websiteID,
          url: "https://www.google.com",
          timeAdded: new Date(),
          userId: "123",
          ticks: [
            {
              id: "123",
              status: "UP",
              responseTimeMs: 100,
              createdAt: new Date(),
              updatedAt: new Date(),
              regionId: "123",
              region: {
                id: "123",
                name: "Europe",
              },
              websiteId: websiteID,
            },
          ],
        }
        vi.mocked(prisma.website.findUnique).mockResolvedValue(mockWebsite)

        vi.spyOn(prisma.website, "findUnique")

        const response = await request(app)
          .get(`/api/v1/website/status/${websiteID}`)
          .set("Cookie", "token=123")

        expect(response.status).toBe(200)
        expect(prisma.website.findUnique).toHaveBeenCalledWith({
          where: {
            id: websiteID,
            userId: "123",
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
        expect(response.body).toEqual({
          status: "UP",
          responseTimeMs: 100,
          region: "Europe",
        })
      })
    })

    describe("Error", () => {
      it("should return 404 if the website does not exist", async () => {
        vi.mocked(prisma.website.findUnique).mockResolvedValue(null)

        const response = await request(app)
          .get(`/api/v1/website/status/${websiteID}`)
          .set("Cookie", "token=123")

        expect(response.status).toBe(404)
        expect(response.body.message).toBe("Website not found")
      })
    })
  })
})
