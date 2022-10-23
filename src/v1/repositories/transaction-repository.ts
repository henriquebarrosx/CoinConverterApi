import { PrismaClient } from "@prisma/client"
import { Transaction } from "@entities/transaction"
import { TransactionRepositoryGateway } from "./transaction-repository-gateway"

export class TransactionRepository implements TransactionRepositoryGateway {
    constructor(private readonly prisma: PrismaClient) {}

    async findAll(): Promise<Transaction[]> {
        const transactions = await this.prisma.transaction.findMany()
        
        return transactions.map(transaction => 
            new Transaction({
                userId: transaction.userId,
                from: transaction.from,
                amount: Number(transaction.amount),
                to: transaction.to,
                conversionTax: Number(transaction.conversionTax),
                createdAt: transaction.createdAt.toUTCString(),
                id: transaction.id,
            })
        )
    }

    async save(transaction: Transaction): Promise<Transaction> {
        const res = await this.prisma.transaction.create({
            data: {
                from: transaction.getCurrencyBase(),
                amount: transaction.getAmount(),
                to: transaction.getCurrencyTarget(),
                conversionTax: transaction.getConversionTax(),
            }
        })

        transaction.setId(res.id)
        transaction.setUserId(res.userId)
        transaction.setUtcDatetime(res.createdAt.toUTCString())

        return transaction
    }
}