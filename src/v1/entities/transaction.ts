import { Currency } from "@common-types/currency"

type Input = {
    id?: string
    userId?: string
    from: string
    amount: number
    to: string
    conversionTax: number
    createdAt?: string
}

export class Transaction {
    private transaction: Input

    constructor(input: Input) {
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
        this.transaction.createdAt = value
    }

    toJSON() {
        return {
            userId: this.transaction.userId,
            ...this.transaction,
            id: this.transaction.id,
            datetime: this.transaction.createdAt
        }
    }
}