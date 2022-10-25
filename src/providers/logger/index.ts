import Pino, { DestinationStream, Logger, LoggerOptions } from "pino"

class Log {
    public log: Logger<LoggerOptions | DestinationStream>

    constructor() {
        this.log = Pino({
            level: "info",
            prettyPrint: {
                colorize: true,
                levelFirst: true,
            },
        })
    }

    info(payload: any): void {
        this.log.info(payload)
    }

    error(payload: any): void {
        this.log.error(payload)
    }
}

export default new Log()