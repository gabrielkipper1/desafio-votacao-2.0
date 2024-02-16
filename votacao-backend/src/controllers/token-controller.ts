import { TokenEncoder } from "../interfaces/token-encoder";
import { User } from "../entities/user";
import { BadRequestError } from "../exceptions/bad-request-error";
import { ERROR_MESSAGES } from "../exceptions/erro-messages";

export class TokenController {
    tokenEncoder: TokenEncoder;

    constructor(tokenEncoder: TokenEncoder) {
        this.tokenEncoder = tokenEncoder;
    }

    async createToken(user: User, admin: boolean): Promise<string> {
        if (!user) throw new BadRequestError(ERROR_MESSAGES.USER_INVALID_DATA)

        const payload = {
            "isAdmin": admin,
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "cpf": user.cpf,

            }
        }
        return this.tokenEncoder.encode(payload);
    }

    async decodeToken(token: string): Promise<any> {
        if (!token) throw new BadRequestError(ERROR_MESSAGES.INVALID_TOKEN)
        return this.tokenEncoder.validate(token);
    }

    async verifyToken(token: string): Promise<any> {
        if (!token) throw new BadRequestError(ERROR_MESSAGES.INVALID_TOKEN)
        return this.tokenEncoder.validate(token);
    }
}