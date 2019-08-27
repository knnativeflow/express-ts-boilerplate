import { config } from './config'
import winston, { format } from 'winston'

winston.configure({
    level: config.debugLogging ? 'debug' : 'info',
    transports: [
        // - Write all logs error (and below) to `error.log`.
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // - Write to all logs with specified level to console.
        new winston.transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        })
    ]
})

export const logger = winston