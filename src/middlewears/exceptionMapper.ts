import {
    Errback,
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction
} from 'express'
import Exception from '../common/Exception'
import { logger } from '../common/logger'

// TODO: Impelement handling mongoose erros

export default function exceptionHandler(
    err: Errback,
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction
) {
     if (_isException(err)) {
            logger.error('An error occured: ' + err.toString())
            res.status(err.httpCode)
            res.json({ messages: err.messages })
        } else {
            res.status(500)
            res.send({messages: ['Unknown error.']})
        }
}

function _isException(toBeDetermined: any): toBeDetermined is Exception {
    return (toBeDetermined as Exception).httpCode && (toBeDetermined as Exception).messages !== undefined
}