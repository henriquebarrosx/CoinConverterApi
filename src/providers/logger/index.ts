import Pino, { DestinationStream, Logger, LoggerOptions } from "pino"

export class Log {
    private log: Logger<LoggerOptions | DestinationStream>

    constructor() {
        this.log = Pino()
    }

    info(payload: any): void {
        this.log.info(payload)
    }

    error(payload: any): void {
        this.log.error(payload)
    }
}