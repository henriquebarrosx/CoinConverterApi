import { HttpClientGateway } from "@providers/http-client/http-client-gateway"
import { CreateTransactionInDto, CreateTransactionOutDto } from "./CreateTransactionDto"
import { TransactionRepositoryGateway } from "@repositories/transaction-repository-gateway"

export class CreateTransactionUseCase {
    constructor(
        private transactionRepository: TransactionRepositoryGateway,
        private httpClientGateway: HttpClientGateway,
    ) {}

    async execute({ from, to, amount }: CreateTransactionInDto): Promise<CreateTransactionOutDto> {
        return
    }
}