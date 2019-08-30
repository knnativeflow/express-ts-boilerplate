import { logger } from '../common/logger'

import mongoose from 'mongoose'

export const connectToMongo = (url: string) => {
    mongoose.connection
        .on('connected', () => logger.info('Connected to the database'))
        .on('error', () => logger.error('Error with database connection'))
        .on('disconnected', connectToMongo)
    return mongoose.connect(url, { keepAlive: true, useNewUrlParser: true })
}
