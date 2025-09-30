import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

async function main() {
  const john = await prisma.user.upsert({
    where: { number: '1234512345' },
    update: {},
    create: {
      number: '1234512345',
      password: await bcrypt.hash('john', 10),
      name: 'john',
      Balance: {
        create: {
            amount: 20000,
            locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token__1",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { number: '5678956789' },
    update: {},
    create: {
      number: '5678956789',
      password: await bcrypt.hash('bob', 10),
      name: 'bob',
      Balance: {
        create: {
            amount: 2000,
            locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "token__2",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const anas = await prisma.user.upsert({
    where: { number: '1234567890' },
    update: {},
    create: {
      number: '1234567890',
      password: await bcrypt.hash('anas', 10),
      name: 'anas',
      Balance: {
        create: {
            amount: 90000,
            locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 50000,
          token: "token__3",
          provider: "HDFC Bank",
        },
      },
    },
  })

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })