import { Request, Response } from "express"
import { CreateTransactionUseCase } from "./CreateTransactionUseCase"


export class CreateTransactionController {
    constructor(private createTransactionUseCase: CreateTransactionUseCase) { }

    async handler(request: Request, response: Response) {
        try {
            const { from, to, amount } = request.body
            const transactionOutDto = await this.createTransactionUseCase.execute({ from, to, amount })
            return response.status(200).json(transactionOutDto)
        }

        catch (error: unknown) {
            return response.status(500).json({
                message: "Unexpected error"
            })
        }
    }
}