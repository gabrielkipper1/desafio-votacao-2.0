import { BadRequestError } from "../exceptions/bad-request-error";
import { ERROR_MESSAGES } from "../exceptions/erro-messages";

export class UserAdmin {
    active: boolean;
    userId: number;

    private constructor(userId: number, active: boolean) {
        if (!userId || !active) {
            throw new BadRequestError(ERROR_MESSAGES.USER_INVALID_DATA);
        }
        this.userId = userId;
        this.active = active;
    }

    public static create(userId: number, active: boolean) {
        return new UserAdmin(userId, active);
    }
}