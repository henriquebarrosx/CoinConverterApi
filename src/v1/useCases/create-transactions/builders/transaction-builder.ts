import { Transaction } from "@entities/transaction"

export const transactionBuilder = new Transaction({
    id: "KAslsuh#Dodj20",
    userId: "hasuh#!D!odj29",
    amount: 5,
    conversionTax: 0.43,
    from: "BRL",
    to: "USD",
    createdAt: new Date("2022-10-20T19:00:00").toUTCString(),
})