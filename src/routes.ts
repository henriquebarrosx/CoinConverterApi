import { Router } from "express"
import { createTransactionController } from "@useCases/create-transactions"

export const routes = Router()

routes.post("/api/v1/transactions", (req, res) => {
    return createTransactionController.handler(req, res)
})
