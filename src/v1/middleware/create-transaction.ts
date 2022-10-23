import { NextFunction, Request, Response } from "express"

import { exceptionHandler } from "@exceptions/exception-handler"
import { IllegalArgumentException } from "@exceptions/illegal-argument-exception"

export function validateRequiredFields(req: Request, res: Response, next: NextFunction) {
    try {
        const { from, to, amount } = req.body

        validateRequiredFieldsExistence(req)
        validateCurrency(from)
        validateCurrency(to)
        validateAmount(amount)

        return next()
    }

    catch (error: any) {
        return exceptionHandler(error, res)
    }
}

function validateRequiredFieldsExistence(request: Request) {
    const requiredFields = ["from", "to", "amount"]

    for (const field of requiredFields) {
        if (request.body.hasOwnProperty(field)) continue
        throw new IllegalArgumentException(`Missing required field: ${field}`)    
    }
}

function validateCurrency(currency: string) {
    if (["BRL", "USD", "EUR", "JPY"].includes(currency.toUpperCase())) return
    throw new IllegalArgumentException("Only can be converted from/to BRL, USD, EUR, JPY")
}

function validateAmount(amount: number) {
    if (amount <= 0) throw new IllegalArgumentException("Amount should be more than zero")
}