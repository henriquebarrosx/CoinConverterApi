import { Transaction } from "@entities/transaction"
import { TransactionRepositoryGateway } from "./transaction-repository-gateway"

export class TransactionRepository implements TransactionRepositoryGateway {
    constructor() {}

    async findAll(): Promise<Transaction[]> {
        const transactions = new Transaction({
            userId: "string",
            from: "string",
            amount: 999,
            to: "string",
            conversionTax: 999,
            createdAt: "string",
            id: "string",
        })

        return [transactions]
    }

    async save(transaction: Transaction): Promise<Transaction> {
        return transaction
    }
}