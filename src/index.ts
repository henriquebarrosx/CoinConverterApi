import express from "express"
import * as dotenv from "dotenv"

import { routes } from "./routes"
import { exceptionHandler } from "@exceptions/exception-handler"

const app = express()

app.use(routes)
app.use(exceptionHandler)

dotenv.config()

app.listen(3333 || process.env.PORT)