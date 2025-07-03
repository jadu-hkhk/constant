import { prisma } from "@repo/db"
import bcrypt from "bcrypt"
import request from "supertest"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { app } from ".."

vi.mock("@repo/db")
vi.mock("bcrypt")
vi.mock("jsonwebtoken")

describe("POST /api/v1/auth/signup", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("Validation", () => {
    it("should return 400 if body is missing", async () => {
      const response = await request(app).post("/api/v1/auth/signup").send({})

      expect(response.status).toBe(400)
      expect(response.body.message).toBe("Validation error")
      expect(response.body.errors).toEqual({
        email: ["Required"],
        password: ["Required"],
      })
    })

    it("should return 400 if email is incorrect", async () => {
      const response = await request(app).post("/api/v1/auth/signup").send({
        email: "random email",
        password: "Asdf1234",
      })

      expect(response.status).toBe(400)
      expect(response.body.message).toBe("Validation error")
      expect(response.body.errors).toEqual({
        email: ["Invalid email"],
      })
    })

    it("should return 400 if password is incorrect", async () => {
      const response = await request(app).post("/api/v1/auth/signup").send({
        email: "random@email.com",
        password: "123",
      })

      expect(response.status).toBe(400)
      expect(response.body.message).toBe("Validation error")
      expect(response.body.errors).toEqual({
        password: ["Password must be at least 8 characters long"],
      })
    })
  })

  describe("Success", () => {
    it("should return 201 if body is correct", async () => {
      vi.mocked(prisma.user.create).mockResolvedValue({
        id: "1",
        email: "random@email.com",
        password: "mocked.hash.value",
        createdAt: new Date(),
      })

      const response = await request(app).post("/api/v1/auth/signup").send({
        email: "random@email.com",
        password: "Asdf1234",
      })

      expect(response.status).toBe(201)
      expect(response.body.message).toBe("Sign up successful")
      expect(response.body.id).toBe("1")
    })
  })

  describe("Error", () => {
    it("should return 409 if user already exists", async () => {
      vi.mocked(prisma.user.create).mockRejectedValue({
        code: "P2002",
      })

      const response = await request(app).post("/api/v1/auth/signup").send({
        email: "random@email.com",
        password: "Asdf1234",
      })

      expect(response.status).toBe(409)
      expect(response.body.message).toBe("User already exists")
    })
  })
})

describe("POST /api/v1/auth/signin", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("Validation", () => {
    it("should return 400 if body is missing", async () => {
      const response = await request(app).post("/api/v1/auth/signup").send({})

      expect(response.status).toBe(400)
      expect(response.body.message).toBe("Validation error")
      expect(response.body.errors).toEqual({
        email: ["Required"],
        password: ["Required"],
      })
    })

    it("should return 400 if email is incorrect", async () => {
      const response = await request(app).post("/api/v1/auth/signup").send({
        email: "random email",
        password: "Asdf1234",
      })

      expect(response.status).toBe(400)
      expect(response.body.message).toBe("Validation error")
      expect(response.body.errors).toEqual({
        email: ["Invalid email"],
      })
    })

    it("should return 400 if password is incorrect", async () => {
      const response = await request(app).post("/api/v1/auth/signup").send({
        email: "random@email.com",
        password: "123",
      })

      expect(response.status).toBe(400)
      expect(response.body.message).toBe("Validation error")
      expect(response.body.errors).toEqual({
        password: ["Password must be at least 8 characters long"],
      })
    })
  })

  describe("Success", () => {
    beforeEach(() => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue({
        id: "1",
        email: "random@email.com",
        password: "mocked.hash.value",
        createdAt: new Date(),
      })
      vi.mocked(bcrypt.compare).mockResolvedValue(true as any)
    })

    it("should return 200 if body is correct", async () => {
      const response = await request(app).post("/api/v1/auth/signin").send({
        email: "random@email.com",
        password: "Asdf1234",
      })

      expect(response.status).toBe(200)
      expect(response.body.message).toBe("Sign in successful")
    })

    it("should set cookie if body is correct", async () => {
      const response = await request(app).post("/api/v1/auth/signin").send({
        email: "random@email.com",
        password: "Asdf1234",
      })

      expect(response.headers["set-cookie"]).toBeDefined()
      expect(response.headers["set-cookie"]?.[0]).toContain("token=")
    })
  })
})

describe("POST /api/v1/auth/signout", () => {
  it("should return 200 if body is correct", async () => {
    const response = await request(app).post("/api/v1/auth/signout").send({})

    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Sign out successful")
  })
})
