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

    getUserId(): string {
        return this.transaction.userId
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

    toJSON() {
        return {
            userId: this.transaction.userId,
            ...this.transaction,
            id: this.transaction.id,
            datetime: this.transaction.createdAt
        }
    }
}