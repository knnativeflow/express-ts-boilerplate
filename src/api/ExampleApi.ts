
import { Controller, Get, Route } from 'tsoa'
import { IExampleModel } from '../models/ExampleModel'
import { ExampleService } from '../service/ExampleService'
import Response from '../common/Response'

@Route()
export class ExampleApi extends Controller {

    @Get('/examples')
    public async getExamples(): Promise<IExampleModel> {
        return ExampleService.getExamples().then(this.unwrap())
    }

    @Get('/error')
    public async getError(): Promise<IExampleModel> {
        return ExampleService.getWithException().then(this.unwrap())
    }

    private unwrap<T>() {
        return (response: Response<T>) => {
            this.setStatus(201)
            return response.body
        }
    }
}