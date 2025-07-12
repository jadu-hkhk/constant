import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const region = await prisma.region.findUnique({
    where: { id: process.env.REGION_ID },
  })
  if (region) {
    console.log("Region already exists")
    return
  }

  await prisma.region.create({
    data: { id: process.env.REGION_ID, name: process.env.REGION_NAME as string },
  })
  console.log("Seeded region: ", process.env.REGION_NAME)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
