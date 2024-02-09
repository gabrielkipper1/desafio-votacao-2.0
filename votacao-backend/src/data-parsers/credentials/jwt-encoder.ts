import { TokenEncoder } from "../../interfaces/token-encoder";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from "../../entities/user";

export class JWTEncoder<T> implements TokenEncoder {
    secret: string = "giwqopkropgaqwe";

    async encode(payload: User): Promise<string> {
        return jwt.sign({ "id": payload.id }, this.secret, { expiresIn: '1h' });
    }

    async validate(token: string): Promise<object> {
        const decoded = jwt.verify(token, this.secret);
        return decoded as object;
    }
}