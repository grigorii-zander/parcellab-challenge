import logger from '~/core/logger'
import { prisma } from '~/prisma/db'

async function seedData() {
  console.log('Noop seed.')
}

async function main() {
  await seedData()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    logger.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
