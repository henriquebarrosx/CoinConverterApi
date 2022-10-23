import { prismaClient } from "@providers/database"
import { HttpClient } from "@providers/http-client/http-client"
import { CreateTransactionUseCase } from "./CreateTransactionUseCase"
import { CreateTransactionController } from "./CreateTransactionController"
import { TransactionRepository } from "@repositories/transaction-repository"

const httpClient = new HttpClient()
const transactionRepository = new TransactionRepository(prismaClient)

const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository, httpClient)
const createTransactionController = new CreateTransactionController(createTransactionUseCase)

export { createTransactionController }