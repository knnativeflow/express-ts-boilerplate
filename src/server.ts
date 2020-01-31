import express from 'express'
import * as bodyParser from 'body-parser'
import * as http from 'http'
import * as swaggerUI from 'swagger-ui-express'
import cors from 'cors'
import requestLogger from './middlewares/requestLogger'
import 'reflect-metadata'
import { connectToMongo } from '../src/config/config.mongoose'
import { logger } from 'common/logger'
import { config } from 'config/config'
import { RegisterRoutes } from 'api/_auto/routes'
import exceptionHandler from './middlewares/exceptionMapper'
import path from 'path'

(async function setup() {

    const app = express()
    const server = http.createServer(app)

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(cors())
    app.use(requestLogger)
    RegisterRoutes(app)
    app.use(exceptionHandler)
    app.use('/static', express.static(path.join(__dirname, './static')))
    app.use('/docs/v1/swagger', swaggerUI.serve, swaggerUI.setup(require('./static/swagger.json')))

    // await connectToMongo(config.databaseUrl)
    server.listen(config.port)
    logger.info(`Server running on port : ${config.port}`)
})()
