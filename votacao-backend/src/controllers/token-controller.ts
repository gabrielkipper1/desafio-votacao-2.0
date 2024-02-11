import { TokenEncoder } from "../interfaces/token-encoder";
import { User } from "../entities/user";

export class TokenController {
    tokenEncoder: TokenEncoder;

    constructor(tokenEncoder: TokenEncoder) {
        this.tokenEncoder = tokenEncoder;
    }

    async createToken(user: User): Promise<string> {
        const payload = {
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
        return this.tokenEncoder.validate(token);
    }

    async verifyToken(token: string): Promise<any> {
        return this.tokenEncoder.validate(token);
    }
}