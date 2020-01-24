import { IExampleModel } from '../models/ExampleModel'
import Exception from '../common/Exception'
import { ErrorCodes } from '../common/errorCodes'
export class ExampleService {

    public static async getExamples(someparam: string, page: number = 0): Promise<IExampleModel> {
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

    public static async getWithException(): Promise<IExampleModel> {
        throw Exception.fromMessage(ErrorCodes.EXAMPLE)
    }
}