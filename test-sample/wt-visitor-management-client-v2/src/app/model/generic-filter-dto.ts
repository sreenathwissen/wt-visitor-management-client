export class GenericFilter {

    fieldName: string = "";
    operator: string = "";
    values: Array<string> = [];
    dataType: string = '';

    constructor(fieldName: string, operator: OperatorOperator, values: Array<string>, dataType: DataType) {
        this.fieldName = fieldName;
        this.operator = operator;
        this.values = values;
        this.dataType = dataType;
    }

}



export enum OperatorOperator {
    GREATER_THAN = 'GREATER_THAN',
    GREATER_THAN_EQUALS = 'GREATER_THAN_EQUALS',
    LESS_THAN = 'LESS_THAN',
    LESS_THAN_EQUALS = 'LESS_THAN_EQUALS',
    EQUALS = 'EQUALS',
    LIKE = 'LIKE',
    NOT_EQ = 'NOT_EQ',
    BETWEEN = 'BETWEEN',
    IN = 'IN'
}

export enum DataType {
    INTEGER = 'INTEGER',
    LONG = 'LONG',
    DOUBLE = 'DOUBLE',
    STRING = 'STRING',
    DATE = 'DATE',
    FLOAT = 'FLOAT'
}