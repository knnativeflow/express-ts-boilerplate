import express, { Request, Response, NextFunction } from "express"
import { logger } from "../common/logger"

const app = express();

export default function requestsLog(
    req: Request,
    res: Response,
    next: NextFunction
){
    logger.info(req.method + " " + req.path);
    next();
}