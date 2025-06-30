import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default prisma
export * from "../generated/prisma" // export the generated types from prisma
