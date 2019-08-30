
import { Body, Controller, Get, Header, Path, Post, Query, Route, SuccessResponse } from 'tsoa'
import { IExampleModel } from '../models/ExampleModel'
import { ExampleService } from '../service/ExampleService'

@Route()
export class ExampleApi extends Controller {

    @Get('/examples')
    public async getExamples(): Promise<IExampleModel> {
        return ExampleService.getExamples()
    }
}