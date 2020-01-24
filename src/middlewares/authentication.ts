import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import Exception from '../common/Exception'
import { ErrorCodes } from '../common/errorCodes'
import { config } from '../config/config'

// TODO: uzupełnić typ o pełną definicję typu
interface TokenPayload {
    user: {
        login: string
    },
    exp: number
}

export async function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {
    if (securityName === 'jwt') {
        const token = request.headers['authorization']
        if (!token) {
            throw Exception.fromMessage(ErrorCodes.NO_AUTH_TOKEN, 401)
        }

        const payload = jwt.verify(token, config.secretKey) as TokenPayload

        if (payload.exp < Date.now() / 1000) {
            throw Exception.fromMessage(ErrorCodes.TOKEN_EXPIRED, 401)
        }

        // const result = await User.findOne({ login: payload.user.login })
        const result = true

        if (!result) {
            throw Exception.fromMessage(ErrorCodes.NO_ACCESS, 403)
        }

        return result
    }
}