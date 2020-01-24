import { connectToMongo } from './config/config.mongoose'
import { config } from './config/config'
import { ExampleService } from './service/ExampleService'

connectToMongo(config.databaseUrl)
.then(async () => {

    // DEFAULT PLAYGROUND
    // HERE YOU CAN PLAY WITH SERVICES
    const result = await ExampleService.getExamples()
    console.log(result)
})
