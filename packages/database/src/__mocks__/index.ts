import type { PrismaClient } from "@prisma/client"
import { mockDeep } from "vitest-mock-extended"

export const prisma = mockDeep<PrismaClient>()

export * from "@prisma/client"
