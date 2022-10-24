import { Response } from "express"
import { exceptionHandler } from "./exception-handler"

describe("exceptionHandler", () => {
    test("Should respond with status 400 and Bad request message", () => {
        const mockedJson = jest.fn().mockImplementation(() => null)

        const res: Partial<Response> = {
            json: mockedJson,
            status: jest.fn().mockImplementation(() => ({ json: mockedJson })),
        }

        const error = { code: 400, message: "Bad request" }

        exceptionHandler(error, res as Response)
        
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ message: "Bad request" })
    })

    test("Should respond with status 429 and Expired tries", () => {
        const mockedJson = jest.fn().mockImplementation(() => null)

        const res: Partial<Response> = {
            json: mockedJson,
            status: jest.fn().mockImplementation(() => ({ json: mockedJson })),
        }

        const error = {
            message: "Expired tries",
            response: { status: 429 }
        }

        exceptionHandler(error, res as Response)
        
        expect(res.status).toHaveBeenCalledWith(429)
        expect(res.json).toHaveBeenCalledWith({ message: "Expired tries" })
    })

    test("Should respond with status 500 and Internal Server Error", () => {
        const mockedJson = jest.fn().mockImplementation(() => null)

        const res: Partial<Response> = {
            json: mockedJson,
            status: jest.fn().mockImplementation(() => ({ json: mockedJson })),
        }

        const error = { message: "Internal Server Error" }

        exceptionHandler(error, res as Response)
        
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" })
    })
})