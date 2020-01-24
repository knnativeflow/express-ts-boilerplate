import { ExampleModel } from '../models/ExampleModel'
import Exception from '../common/Exception'
import { ErrorCodes } from '../common/errorCodes'
export class ExampleService {

    public static async getExamples(someparam: string, page = 0): Promise<ExampleModel> {
        return {
                name: someparam,
                age: 5,
                another: {
                    field: 'asdasd',
                    date: '2019-02-23',
                    isRequired: true
                }
            }

    }

    public static async getWithException(): Promise<ExampleModel> {
        throw Exception.fromMessage(ErrorCodes.EXAMPLE)
    }
}