
import { Controller, Get, Route, Security, Request, Query, Tags } from 'tsoa'
import { IExampleModel } from '../models/ExampleModel'
import { ExampleService } from '../service/ExampleService'
import AuthRequest from '../common/AuthRequest'

@Route()
@Tags('Examples')
export class ExampleApi extends Controller {

    /**
     * Some description bla bla .
     *
     * @param someParam Param description
     */
    @Get('/examples/{someParam}')
    public async getExamples(
        someParam: string,
        @Query('page') page?: number,
    ): Promise<IExampleModel> {
        return ExampleService.getExamples(someParam, page)
    }

    @Security('jwt')
    @Get('/secure')
    public async secure(@Request() request: AuthRequest): Promise<IExampleModel> {
        return ExampleService.getExamples('chuj')
    }

    @Get('/error')
    public async getError(): Promise<IExampleModel> {
        return ExampleService.getWithException()
    }
}