import { prismaClient } from "@providers/database"
import { HttpClient } from "@providers/http-client/http-client"
import { transactionBuilder } from "../builders/transaction-builder"
import { CreateTransactionUseCase } from "./CreateTransactionUseCase"
import { TransactionRepository } from "@repositories/transaction-repository"

describe("CreateTransactionUseCase", () => {
    const httpClient = new HttpClient()
    const repository = new TransactionRepository(prismaClient)
    const createTransactionUseCase = new CreateTransactionUseCase(repository, httpClient)

    beforeEach(() => {
        TransactionRepository.prototype.save = jest.fn().mockResolvedValue(transactionBuilder)
        
        HttpClient.prototype.get = jest.fn().mockResolvedValue({
            info: { quote: 0.43 },
            result: 12,
        })
    })

    test("should call httpClient calling api layer service", () => {
        createTransactionUseCase.execute({ from: "BRL", to: "USD", amount: 5 })

        expect(httpClient.get)
            .toHaveBeenCalledWith(
                `https://api.apilayer.com/currency_data/convert?from=BRL&to=USD&amount=5`,
                { headers: { 'apikey': process.env.API_KEY }}
            )
    })

    test("should save transaction", async () => {
       await createTransactionUseCase.execute({ from: "BRL", to: "USD", amount: 5 })

        expect(repository.save)
            .toHaveBeenCalledWith({
                transaction: {
                    from: "BRL",
                    to: "USD",
                    amount: 5,
                    conversionTax: 0.43,
                    id: undefined,
                    userId: undefined,
                    createdAt: undefined,
                }
            })
    })

    test("should save transaction", async () => { 
        const res = await createTransactionUseCase.execute({ from: "BRL", to: "USD", amount: 5 })

        expect(res).toMatchObject({
            id: undefined,
            userId: undefined,
            from: "BRL",
            amount: 5,
            to: "USD",
            result: 12,
            conversionTax: 0.43,
            createdAt: undefined,
        })
     })
})