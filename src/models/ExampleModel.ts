export interface ExampleModel {
    name: string;
    age: number;
    another: AnotherModel;
}

export interface AnotherModel {
    field: string;
    date: string;
    isRequired: boolean;
}