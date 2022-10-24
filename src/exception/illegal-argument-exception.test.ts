import { IllegalArgumentException } from "./illegal-argument-exception"

describe("IllegalArgumentException", () => {
    test("Should have 400 as status code", () => {
        const exception = new IllegalArgumentException("Bad request")
        expect(exception.code).toEqual(400)
    })

    test("Should have Bad request as error message", () => {
        const exception = new IllegalArgumentException("Bad request")
        expect(exception.message).toEqual("Bad request")
    })

    test("Should have IllegalArgumentException as exception name", () => {
        const exception = new IllegalArgumentException("Bad request")
        expect(exception.name).toEqual("IllegalArgumentException")
    })
})