import { IExampleModel } from '../models/ExampleModel'
import { Response } from '../common/Response'
import Exception from '../common/Exception'
import { ErrorCodes } from '../common/errorCodes'

export class ExampleService {

    public static async getExamples(): Promise<Response<IExampleModel>> {
        return await new Response(
            {
                name: 'ASD',
                age: 5,
                another: {
                    field: 'asdasd',
                    date: '2019-02-23',
                    isRequired: true
                }
            }
        )
    }

    public static async getWithException(): Promise<Response<IExampleModel>> {
        throw Exception.fromMessage(ErrorCodes.EXAMPLE)
    }
}