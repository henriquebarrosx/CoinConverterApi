import { Request, Response } from "express"

import { prismaClient } from "../../../providers/database"
import { transactionBuilder } from "./builders/transaction-builder"
import { CreateTransactionUseCase } from "./CreateTransactionUseCase"
import { HttpClient } from "../../../providers/http-client/http-client"
import { CreateTransactionController } from "./CreateTransactionController"
import { TransactionRepository } from "../../repositories/transaction-repository"

describe("CreateTransactionController", () => {
    const httpClient = new HttpClient()
    const repository = new TransactionRepository(prismaClient)
    const createTransactionUseCase = new CreateTransactionUseCase(repository, httpClient)

    const mockedJson = jest.fn().mockImplementation(() => null)

    const response: Partial<Response> = {
        json: mockedJson,
        status: jest.fn().mockImplementation(() => ({ json: mockedJson })),
    }

    beforeEach(() => {
        TransactionRepository.prototype.save = jest.fn().mockResolvedValue(transactionBuilder)
        jest.clearAllMocks()
    })
 
    test("should return a transaction when success", async () => {
        HttpClient.prototype.get = jest.fn().mockResolvedValue({
            info: { quote: 0.43 },
            result: 12,
        })

        const transactionController = new CreateTransactionController(createTransactionUseCase)
        const request = { body: { from: "BRL", to: "USD", amount: 5 } } as Request

        await transactionController.handler(request, response as Response)

        expect(response.status).toHaveBeenCalledWith(200)
        expect(response.json).toHaveBeenCalledWith({
            id: undefined,
            userId: undefined,
            amount: 5,
            conversionTax: 0.43,
            from: "BRL",
            to: "USD",
            result: 12,
            datetime: undefined,
        })
    })

    test("should respond with a 429 status code, meaning that expired conversion tries", async () => {
        HttpClient.prototype.get = jest.fn().mockRejectedValue({
            message: "Too many requests",
            response: { status: 429 }
        })

        const transactionController = new CreateTransactionController(createTransactionUseCase)
        const request = { body: { from: "BRL", to: "USD", amount: 5 } } as Request

        await transactionController.handler(request, response as Response)

        expect(response.status).toHaveBeenCalledWith(429)
        expect(response.json).toHaveBeenCalledWith({ message: "Too many requests" })
    })
})