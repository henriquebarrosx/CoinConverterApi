import Winston, { format, transports } from "winston"

class Log {
   private logger

   constructor() {
      const { combine, timestamp, label, printf } = format

      const customFormat = printf(({ level, message, label, timestamp }) => {
         return `${timestamp} [${label}] ${level}: ${message}`
      })

      this.logger = Winston.createLogger({
         format: combine(
            label({ label: 'LOG' }),
            timestamp(),
            customFormat
          ),
         transports: [
            new transports.Console()
         ]
      })
   }

    info(payload: any): void {
       this.logger.info(payload)
    }

    error(payload: any): void {
      this.logger.error(payload)
    }
}

export default new Log()