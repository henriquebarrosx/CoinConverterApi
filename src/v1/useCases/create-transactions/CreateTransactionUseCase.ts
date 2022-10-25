import Log from "@providers/logger"
import { Transaction } from "@entities/transaction"
import { HttpClientGateway } from "@providers/http-client/http-client-gateway"
import { TransactionRepositoryGateway } from "@repositories/transaction-repository-gateway"
import { CoversionServiceOutDto, CreateTransactionInDto, CreateTransactionOutDto } from "./CreateTransactionDto"

export class CreateTransactionUseCase {
    constructor(
        private transactionRepository: TransactionRepositoryGateway,
        private httpClientGateway: HttpClientGateway,
    ) {}

    async execute({ from, to, amount }: CreateTransactionInDto): Promise<CreateTransactionOutDto> {
        const res = await this.httpClientGateway.get<CoversionServiceOutDto>(
            `https://api.apilayer.com/currency_data/convert?from=${from}&to=${to}&amount=${amount}`,
            { headers: { 'apikey': process.env.API_KEY }}
        )

        const transaction = new Transaction({ from, to, amount, conversionTax: res.info.quote })
        await this.transactionRepository.save(transaction)

        Log.info({
            message: `Transaction ${transaction.getId()} created`,
            timestamp: new Date().toISOString()
        })

        return {
            id: transaction.getId(),
            userId: transaction.getUserId(),
            from: from,
            amount: amount,
            to: to,
            result: res.result,
            conversionTax: transaction.getConversionTax(),
            createdAt: transaction.getUtcDatetime(),
        }
    }
}