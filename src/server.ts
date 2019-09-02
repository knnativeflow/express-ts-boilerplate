import express from 'express'
import * as bodyParser from 'body-parser'
import * as http from 'http'
import * as swaggerUI from 'swagger-ui-express'
import cors from 'cors'
import 'reflect-metadata'
import { connectToMongo } from '../src/config/config.mongoose'
import { logger } from './common/logger'
import { config } from './config/config'
import { RegisterRoutes } from './api/_auto/routes'
import exceptionHandler from './middlewares/exceptionMapper'
import path from 'path'

const swaggerJSON = require('../dist/swagger.json')

const app = express()
const server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
RegisterRoutes(app)
app.use(exceptionHandler)
app.use('/swagger.json', express.static(__dirname + '/swagger/swagger.json'))
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerJSON))
app.use('/static', express.static(path.join(__dirname, '../dist')))
app.use('/docs/v1/swagger', swaggerUI.serve, swaggerUI.setup(swaggerJSON))

server.listen(config.port)
logger.info(`Server running on port : ${config.port}`)
// connectToMongo(config.databaseUrl)
// .then(() => {
//     server.listen(config.port)
//     logger.info(`Server running on port : ${config.port}`)
// })
