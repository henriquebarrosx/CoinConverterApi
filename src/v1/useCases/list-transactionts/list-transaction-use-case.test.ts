import { prismaClient } from "../../../providers/database"
import { ListTransactionsUseCase } from "./ListTransactionUseCase"
import { TransactionRepository } from "../../repositories/transaction-repository"
import { transactionBuilder } from "../create-transactions/builders/transaction-builder"

describe("ListTransactionsUseCase", () => {
    const repository = new TransactionRepository(prismaClient)
    const listTransactionUseCase = new ListTransactionsUseCase(repository)

    beforeEach(() => {
        TransactionRepository.prototype.findAll = jest.fn().mockResolvedValue([ transactionBuilder ])
    })

    test("should list all transactions", async () => {
        const response = await listTransactionUseCase.execute()
        
        expect(response).toHaveLength(1)
        expect(response).toEqual([
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
})