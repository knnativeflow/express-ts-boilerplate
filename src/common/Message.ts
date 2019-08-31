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
