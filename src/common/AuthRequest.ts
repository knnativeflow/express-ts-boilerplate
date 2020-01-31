import { Request as ExpressRequest } from 'express'

export default interface AuthRequest extends ExpressRequest {
    user: any;
}