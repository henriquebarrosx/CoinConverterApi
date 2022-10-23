import { Response } from "express"

const EXCEEDED_RATE_LIMIT = 429
const INTERNAL_SERVER_ERROR = 500

export function exceptionHandler(error: any, response: Response) {
    if (error?.code) {
        return response.status(error?.code).json({
            message: error?.message
        })
    }

    if (error?.response.status === EXCEEDED_RATE_LIMIT) {
        return response.status(error?.code).json({
            message: error?.message
        })
    }

    if (error) {
        return response.status(INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error"
        })
    }
}