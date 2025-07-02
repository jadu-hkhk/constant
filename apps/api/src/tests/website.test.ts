import { prisma } from "@repo/db"
import request from "supertest"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { app } from ".."

vi.mock("@repo/db")

describe("Website API", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("POST /api/v1/website", () => {
    it("should not create a website if the url is missing", async () => {
      const response = await request(app).post("/api/v1/website").send({})

      expect(response.status).toBe(400)
      expect(response.body.message).toBe("URL is required")
    })

    it("should create a website if the url is valid", async () => {
      const mockWebsite = {
        id: "123",
        url: "https://www.google.com",
        timeAdded: new Date(),
      }

      vi.mocked(prisma.website.create).mockResolvedValue(mockWebsite)

      const response = await request(app)
        .post("/api/v1/website")
        .send({ url: "https://www.google.com" })

      expect(response.status).toBe(201)
      expect(response.body.id).toBe("123")

      expect(prisma.website.create).toHaveBeenCalledWith({
        data: {
          url: "https://www.google.com",
        },
      })
    })
  })
})
