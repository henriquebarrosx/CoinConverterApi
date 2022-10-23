import { Router } from "express"
import { validateRequiredFields } from "@middlewares/create-transaction"
import { listTransactionsController } from "@useCases/list-transactionts"
import { createTransactionController } from "@useCases/create-transactions"

export const routes = Router()

routes.get("/api/v1/transactions", (req, res) => {
    return listTransactionsController.handler(req, res)
})

routes.post("/api/v1/transactions", validateRequiredFields, (req, res) => {
    return createTransactionController.handler(req, res)
})
