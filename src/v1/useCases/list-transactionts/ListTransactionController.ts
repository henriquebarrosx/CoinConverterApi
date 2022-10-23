import { Request, Response } from "express"

import { exceptionHandler } from "@exceptions/exception-handler"
import { ListTransactionsUseCase } from "./ListTransactionUseCase"

export class ListTransactionsController {
    constructor(private listTransactionsUseCase: ListTransactionsUseCase) {}

   async handler(_: Request, response: Response) {
        try {
            const transactions = await this.listTransactionsUseCase.execute()
            return response.status(200).json(transactions)
        }

        catch (error: unknown) {
            return exceptionHandler(error, response)
        }
    }
}