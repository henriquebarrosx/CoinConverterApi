import { Request, Response } from "express"

import { prismaClient } from "../../../providers/database"
import { ListTransactionsUseCase } from "./ListTransactionUseCase"
import { transactionBuilder } from "../builders/transaction-builder"
import { ListTransactionsController } from "./ListTransactionController"
import { TransactionRepository } from "../../repositories/transaction-repository"

describe("CreateTransactionController", () => {
    const mockedJson = jest.fn().mockImplementation(() => null)

    const request = { body: {} } as Request

    const response: Partial<Response> = {
        json: mockedJson,
        status: jest.fn().mockImplementation(() => ({ json: mockedJson })),
    }

    const repository = new TransactionRepository(prismaClient)
    const listTransactionUseCase = new ListTransactionsUseCase(repository)
 
    test("should return a single transaction into transaction list when success", async () => {
        TransactionRepository.prototype.findAll = jest.fn().mockResolvedValue([transactionBuilder])        

        const transactionController = new ListTransactionsController(listTransactionUseCase)
        await transactionController.handler(request, response as Response)

        expect(response.status).toHaveBeenCalledWith(200)
        expect(response.json).toHaveBeenCalledWith([
            {
                id: "KAslsuh#Dodj20",
                userId: "hasuh#!D!odj29",
                amount: 5,
                conversionTax: 0.43,
                from: "BRL",
                to: "USD",
                createdAt: new Date("2022-10-20T19:00:00").toUTCString(),
            }
        ])
    })

    test("should return a empty transaction list when success", async () => {
        TransactionRepository.prototype.findAll = jest.fn().mockResolvedValue([])        

        const transactionController = new ListTransactionsController(listTransactionUseCase)
        await transactionController.handler(request, response as Response)

        expect(response.status).toHaveBeenCalledWith(200)
        expect(response.json).toHaveBeenCalledWith([])
    })

    test("should return internal server error", async () => {
        TransactionRepository.prototype.findAll = jest.fn().mockRejectedValueOnce({})        
        
        const transactionController = new ListTransactionsController(listTransactionUseCase)
        await transactionController.handler(request, response as Response)

        expect(response.status).toHaveBeenCalledWith(500)
    })
})