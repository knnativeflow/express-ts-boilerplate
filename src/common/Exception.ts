import { Message } from './Message'
import { ErrorCodes } from './errorCodes'

export default class Exception {
    messages: [Message]
    httpCode: number

    constructor(messages: [Message], httpCode = 500) {
        this.messages = messages
        this.httpCode = httpCode
    }

    static fromMessage(errorCode: ErrorCodes, httpCode = 500): Exception {
        return new this([new Message(errorCode)], httpCode)
    }

    toString(): string {
        return this.messages
        .map(m => m.message)
        .join('; ')
    }
}