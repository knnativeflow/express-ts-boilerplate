
import { Controller, Get, Route, Security, Query, Tags } from 'tsoa'
import { ExampleModel } from 'models/ExampleModel'
import { ExampleService } from 'service/ExampleService'

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
    ): Promise<ExampleModel> {
        return ExampleService.getExamples(someParam, page)
    }

    @Security('jwt')
    @Get('/secure')
    public async secure(): Promise<ExampleModel> {
        return ExampleService.getExamples('chuj')
    }

    @Get('/error')
    public async getError(): Promise<ExampleModel> {
        return ExampleService.getWithException()
    }
}