import { BadRequestError } from "../exceptions/bad-request-error";
import { ERROR_MESSAGES } from "../exceptions/erro-messages";
import { User } from "./user";

export class UserPassword {
    userId: number;
    password: string;

    private constructor(user: number | undefined, password: string) {
        if (!user || !password) {
            throw new BadRequestError(ERROR_MESSAGES.INVALID_DATA);
        }
        this.userId = user;
        this.password = password;
    }

    public static create(userId: number, password: string) {
        return new UserPassword(userId, password);
    }
}