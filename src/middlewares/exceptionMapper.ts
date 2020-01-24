import {
    Errback,
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction
} from 'express'
import Exception from '../common/Exception'
import { logger } from '../common/logger'

// TODO: Impelement handling mongoose erros

export default function (
    err: Errback,
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction
): void {
    if (_isException(err)) {
        logger.error('An error occurred: ' + err.toString())
        res.status(err.httpCode)
        res.json({ messages: err.messages })
    } else if (err.name && (err as any).message) {
        const msg = `${err.name}: ${(err as any).message}`
        logger.error(msg)
        res.status(500)
        res.send({ messages: [msg] })
    } else {
        logger.error(err)
        res.status(500)
        res.send({ messages: ['Unknown error.'] })
    }
}

function _isException(toBeDetermined: any): toBeDetermined is Exception {
    return (toBeDetermined as Exception).httpCode && (toBeDetermined as Exception).messages !== undefined
}