import { Request, Response } from "express"

import Log from "@providers/logger"
import { exceptionHandler } from "@exceptions/exception-handler"
import { ListTransactionsUseCase } from "./ListTransactionUseCase"

export class ListTransactionsController {
    constructor(private listTransactionsUseCase: ListTransactionsUseCase) {}

   async handler(_: Request, response: Response) {
        try {
            const transactions = await this.listTransactionsUseCase.execute()
            return response.status(200).json(transactions)
        }

        catch (error: any) {
            Log.info({
                message: error?.message || "Unexpected error",
                timestamp: new Date().toISOString()
            })

            return exceptionHandler(error, response)
        }
    }
}