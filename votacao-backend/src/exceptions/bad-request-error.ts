import { ApiError } from "./api-error";

export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(400, message);
    }
}