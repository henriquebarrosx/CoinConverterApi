import { Currency } from "@common-types/currency"

export type TransactionSchema = {
    id?: string
    userId?: string
    from: string
    amount: number
    to: string
    conversionTax: number
    createdAt?: string
}

export class Transaction {
    private transaction: TransactionSchema

    constructor(input: TransactionSchema) {
        this.transaction = input
    }

    getId(): string {
        return this.transaction.id
    }

    setId(value: string): void {
        this.transaction.id = value
    }

    getUserId(): string {
        return this.transaction.userId
    }

    setUserId(value: string): void {
        this.transaction.userId = value
    }

    getCurrencyBase(): Currency {
        return this.transaction.from as Currency
    }

    getCurrencyTarget(): Currency {
        return this.transaction.to as Currency
    }

    getConversionTax(): number {
        return this.transaction.conversionTax
    }

    getAmount(): number {
        return this.transaction.amount
    }

    getUtcDatetime(): string {
        return this.transaction.createdAt
    }

    setUtcDatetime(value: string): void {
        const isValid = Number.isInteger(new Date(value).getTime())

        if (isValid) {
            this.transaction.createdAt = value
            return
        }

        throw new Error("Invalid provided utc datetime")
    }

    toJSON() {
        return {
            userId: this.transaction.userId,
            ...this.transaction,
            id: this.transaction.id,
            createdAt: this.transaction.createdAt
        }
    }
}