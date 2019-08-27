import { ErrorCodes } from './errorCodes'

export class Response<T> {
    readonly body: T | null
    readonly messages: Message[]

    constructor(body: T, messages: Message[] = []) {
        this.body = body
        this.messages = messages
    }

    static withStringMsg<T>(body: T, message: string) {
        return new this(body, [new Message(message)])
    }

    static fromStringMsg(message: string) {
        return new this(null, [new Message(message)])
    }

    static fromMessage(message: Message) {
        return new this(null, [message])
    }

    static fromErrorCode(errorCode: ErrorCodes, type: MessageType) {
        return new this(null, [new Message(errorCode, type)])
    }
}

export class Message {
    constructor(
        readonly message: string,
        readonly type: MessageType = MessageType.INFO
    ) {}
}

export enum MessageType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info'
}

