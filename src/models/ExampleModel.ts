

export interface IExampleModel {
    name: string
    age: number
    another: IAnotherModel
}

export interface IAnotherModel {
    field: string
    date: string
    isRequired: boolean
}