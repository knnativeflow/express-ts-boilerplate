import express from 'express'
import * as bodyParser from 'body-parser'
import * as http from 'http'
import cors from 'cors'
import { connectToMongo } from '../src/common/config.mongoose'
import { logger } from '../src/common/logger'
import { config } from '../src/common/config'

const app = express()
const server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

connectToMongo(config.databaseUrl)
.then(() => {
    server.listen(config.port)
    logger.info(`Server running on port : ${config.port}`)
})