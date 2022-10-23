import { ListTransactionsOutDto } from "./ListTransactionDto"
import { TransactionRepositoryGateway } from "@repositories/transaction-repository-gateway"

export class ListTransactionsUseCase {
    constructor(private transactionRepository: TransactionRepositoryGateway) {}

    async execute(): Promise<ListTransactionsOutDto> {
        const transactions = await this.transactionRepository.findAll()
        return transactions
    }
}