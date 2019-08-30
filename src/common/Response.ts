import { ErrorCodes } from './errorCodes'

export class Response<T> {
    readonly body: T
    readonly messages: Message[]

    constructor(body: T, messages: Message[] = []) {
        this.body = body
        this.messages = messages
    }

    static withMessageCode<T>(body: T, code: ErrorCodes, type: MessageType = MessageType.ERROR) {
        return new this(body, [new Message(code, type)])
    }

}

export class Message {
    constructor(
        readonly message: string,
        readonly type: MessageType = MessageType.ERROR
    ) {}
}

export enum MessageType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info'
}

