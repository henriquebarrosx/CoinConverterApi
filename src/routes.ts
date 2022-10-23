import { Router } from "express"
import { validateRequiredFields } from "@middlewares/create-transaction"
import { createTransactionController } from "@useCases/create-transactions"

export const routes = Router()

routes.post("/api/v1/transactions", validateRequiredFields, (req, res) => {
    return createTransactionController.handler(req, res)
})
