import { Currency } from "@common-types/currency"

export type CreateTransactionInDto = {
    from: Currency
    to: Currency
    amount: number
}

export type CreateTransactionOutDto = {
    userId: string
    id: string
    conversionTax: number
    datetime: string
    from: string
    to: string
    amount: number
    result: number
}

export type CoversionServiceOutDto = {
    success: boolean
    query: {
        from: string
        to: string
        amount: number
    },
    info: {
        timestamp: number,
        quote: number
    },
    result: number
}