import { IExampleModel } from 'models/ExampleModel'

export class ExampleService {

    public static async getExamples(): Promise<IExampleModel> {
        return await {
            name: 'ASD',
            age: 5,
            another: {
                field: 'asdasd',
                date: '2019-02-23',
                isRequired: true
            }
        }
    }
}