export interface DataParser<T> {
    parse(data: any): T;
    stringify(data: T): string;
}