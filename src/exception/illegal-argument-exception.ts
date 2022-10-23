export class IllegalArgumentException extends Error {
    public code

    constructor(message: string) {
        super(message)
        this.name = "IllegalArgumentException"
        this.code = 400
    }
}