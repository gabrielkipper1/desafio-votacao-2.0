import { TokenEncoder } from "../../interfaces/token-encoder";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from "../../entities/user";
import { BadRequestError } from "../../exceptions/bad-request-error";
import { ERROR_MESSAGES } from "../../exceptions/erro-messages";

export class JWTEncoder<T> implements TokenEncoder {
    secret: string = process.env.JWT_SECRET || "default-secret";

    async encode(payload: object): Promise<string> {
        return jwt.sign(payload, this.secret, { expiresIn: "3m" });
    }

    async validate(token: string): Promise<object> {
        const decoded = jwt.verify(token, this.secret);
        if (!decoded) throw new BadRequestError(ERROR_MESSAGES.ERROR_DECODING_TOKEN)

        const decodedPayload = decoded as JwtPayload;
        if (decodedPayload.exp && (decodedPayload.exp < Date.now() / 1000)) throw new BadRequestError(ERROR_MESSAGES.TOKEN_EXPIRED)
        if (decodedPayload.iat && (decodedPayload.iat > Date.now() / 1000)) throw new BadRequestError(ERROR_MESSAGES.TOKEN_NOT_YET_VALID)

        return decoded as object;
    }
}