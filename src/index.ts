import express from "express"

import { routes } from "./routes"
import { exceptionHandler } from "@exceptions/exception-handler"

const app = express()

app.use(routes)
app.use(exceptionHandler)

app.listen(3333 || process.env.PORT)