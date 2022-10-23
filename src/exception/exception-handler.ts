import { Response } from "express"

const INTERNAL_SERVER_ERROR = 500

export function exceptionHandler(error: any, response: Response) {
    if (error) {
        return response.status(INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error"
        })
    }
}