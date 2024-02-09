export interface TokenEncoder {
    encode(payload: object): Promise<string>;
    validate(token: string): Promise<object>;
}