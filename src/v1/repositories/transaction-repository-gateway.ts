import { Transaction } from "@entities/transaction"

export interface TransactionRepositoryGateway {
    findAll(): Promise<Transaction[]>
    save(transaction: Transaction): Promise<Transaction>
}