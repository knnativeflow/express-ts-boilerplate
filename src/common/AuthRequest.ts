import { Request as ExpressRequest } from 'express'
import { IUser } from 'models/UserModel'

export default interface AuthRequest extends ExpressRequest {
    user: IUser
}