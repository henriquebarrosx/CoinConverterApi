import { Request, Response } from "express"

import Log from "@providers/logger"
import { exceptionHandler } from "@exceptions/exception-handler"
import { CreateTransactionUseCase } from "./CreateTransactionUseCase"


export class CreateTransactionController {
    constructor(private createTransactionUseCase: CreateTransactionUseCase) { }

    async handler(request: Request, response: Response) {
        try {
            const { from, to, amount } = request.body
            const transactionOutDto = await this.createTransactionUseCase.execute({ from, to, amount })
            return response.status(201).json(transactionOutDto)
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