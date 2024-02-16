import { BadRequestError } from "../../../src/exceptions/bad-request-error";
import { JWTEncoder } from "../../../src/data-parsers/credentials/jwt-encoder";
import { JsonWebTokenError } from "jsonwebtoken";

describe('JWTEncoder', () => {
    let jwtEncoder: JWTEncoder<any>;

    beforeEach(() => {
        jwtEncoder = new JWTEncoder();
    });

    it('should encode a payload', async () => {
        const payload = { id: 1, username: 'testuser' };
        const token = await jwtEncoder.encode(payload);
        expect(token).toBeDefined();
    });

    it('should decode a token', async () => {
        const payload = { id: 1, username: 'testuser' };
        const token = await jwtEncoder.encode(payload);
        const decoded = await jwtEncoder.validate(token);
        expect(decoded["id"]).toEqual(payload.id);
        expect(decoded["username"]).toEqual(payload.username);
    });

    it('should throw an error if token is invalid', async () => {
        const token = "invalid-token";
        try {
            await jwtEncoder.validate(token);
        } catch (error) {
            expect(error).toBeInstanceOf(JsonWebTokenError);
        }
    });
});