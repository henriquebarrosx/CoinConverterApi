import { prismaClient } from "@providers/database"
import { ListTransactionsUseCase } from "./ListTransactionUseCase"
import { ListTransactionsController } from "./ListTransactionController"
import { TransactionRepository } from "@repositories/transaction-repository"

const transactionRepository = new TransactionRepository(prismaClient)

const listTransactionsUseCase = new ListTransactionsUseCase(transactionRepository)
const listTransactionsController = new ListTransactionsController(listTransactionsUseCase)

export { listTransactionsController }