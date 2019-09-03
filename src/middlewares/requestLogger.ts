import {
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction
} from 'express'
import { logger } from '../common/logger'

export default function requestLogger(
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction
) {
    logger.info(req.method + ' ' + req.path)
    next()
}