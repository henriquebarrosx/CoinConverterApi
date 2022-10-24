import { Request, Response } from "express"
import { validateRequiredFields } from "./create-transaction"

describe("validateRequiredFields", () => {
    const mockedJson = jest.fn().mockImplementation(() => null)

    const res: Partial<Response> = {
        json: mockedJson,
        status: jest.fn().mockImplementation(() => ({ json: mockedJson })),
    }

    const next = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("should call next function", () => {        
        const req = { body: { from: "BRL", to: "USD", amount: 5 } } as Request
        
        validateRequiredFields(req, res as Response, next)

        expect(next).toHaveBeenCalled()
    })

    test("should send a status 400 with 'Missing required field: from' message ", () => {        
        const req = { body: { to: "USD", amount: 5 } } as Request

        validateRequiredFields(req, res as Response, next)

        expect(res.json).toHaveBeenCalledWith({ message: "Missing required field: from" })
        expect(res.status).toHaveBeenCalledWith(400)
        expect(next).not.toHaveBeenCalled()
    })

    test("should send a status 400 with 'Missing required field: to' message ", () => {        
        const req = { body: { from: "BRL", amount: 5 } } as Request

        validateRequiredFields(req, res as Response, next)

        expect(res.json).toHaveBeenCalledWith({ message: "Missing required field: to" })
        expect(res.status).toHaveBeenCalledWith(400)
        expect(next).not.toHaveBeenCalled()
    })

    test("should send a status 400 with 'Missing required field: amount' message ", () => {        
        const req = { body: { from: "BRL", to: "USD" } } as Request

        validateRequiredFields(req, res as Response, next)

        expect(res.json).toHaveBeenCalledWith({ message: "Missing required field: amount" })
        expect(res.status).toHaveBeenCalledWith(400)
        expect(next).not.toHaveBeenCalled()
    })

    test("should send a status 400 with 'Only can be converted from/to BRL, USD, EUR, JPY' message to from field ", () => {        
        const req = { body: { from: "BRLL", to: "USD", amount: 5 } } as Request

        validateRequiredFields(req, res as Response, next)

        expect(res.json).toHaveBeenCalledWith({ message: "Only can be converted from/to BRL, USD, EUR, JPY" })
        expect(res.status).toHaveBeenCalledWith(400)
        expect(next).not.toHaveBeenCalled()
    })

    test("should send a status 400 with 'Only can be converted from/to BRL, USD, EUR, JPY' message to 'to' field ", () => {        
        const req = { body: { from: "BRL", to: "USDD", amount: 5 } } as Request

        validateRequiredFields(req, res as Response, next)

        expect(res.json).toHaveBeenCalledWith({ message: "Only can be converted from/to BRL, USD, EUR, JPY" })
        expect(res.status).toHaveBeenCalledWith(400)
        expect(next).not.toHaveBeenCalled()
    })

    test("should send a status 400 with 'Amount should be more than zero' message to amount field ", () => {        
        /*
            OBS: The default behavior, basing of the express setup in index.ts file, 
            is to serialized the request body to JSON. Provide the 0 number in test 
            will throw a different exception that is sent to the client. So, to reproduce the
            same behavior, it's provided the 0 number as string.
        */

        const req = { body: { from: "BRL", to: "USD", amount: "0" } } as Request

        validateRequiredFields(req, res as Response, next)

        expect(res.json).toHaveBeenCalledWith({ message: "Amount should be more than zero" })
        expect(res.status).toHaveBeenCalledWith(400)
        expect(next).not.toHaveBeenCalled()
    })
})