import { prisma } from "@repo/db"
import { xAddBulk } from "@repo/redis"

async function main() {
  const websites = await prisma.website.findMany({
    select: {
      url: true,
      id: true,
    },
  })

  await xAddBulk(websites)
}

setInterval(
  () => {
    main()
  },
  3 * 60 * 1000,
)
