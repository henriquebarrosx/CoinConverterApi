import { PrismaClient } from "@prisma/client"
import Log from "../logger"

const prismaClient = new PrismaClient()

;(async () => {
    Log.info("Connecting to database...") 

    await prismaClient.$connect()
        .then(() => Log.info("Database connected!"))
        .catch((error) => Log.error("Faling connecting to database. " + error?.message))
})()

export { prismaClient }