import { NextFunction, Request, Response } from "express"

import { exceptionHandler } from "@exceptions/exception-handler"
import { IllegalArgumentException } from "@exceptions/illegal-argument-exception"

export function validateRequiredFields(req: Request, res: Response, next: NextFunction) {
    try {
        const { from, to, amount } = req.body

        validateCurrency(from)
        validateCurrency(to)
        validateAmount(amount)

        return next()
    }

    catch (error: any) {
        return exceptionHandler(error, res)
    }
}

function validateCurrency(currency: string) {
    if (["BRL", "USD", "EUR", "JPY"].includes(currency.toUpperCase())) return
    throw new IllegalArgumentException("Only can be converted from/to BRL, USD, EUR, JPY")
}

function validateAmount(amount: number) {
    if (amount <= 0) throw new IllegalArgumentException("Amount should be more than zero")
}