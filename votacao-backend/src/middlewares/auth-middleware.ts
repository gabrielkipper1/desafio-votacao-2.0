import { NextFunction } from "express";
import { JWTEncoder } from "../data-parsers/credentials/jwt-encoder";
import { Request, Response } from "express";
import { BadRequestError } from "../exceptions/bad-request-error";
import { ERROR_MESSAGES } from "../exceptions/erro-messages";

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    //this middleware prevents user from accessing the endpoint if the token is not valid
    const token = req.headers.authorization;
    if (!token) {
        throw new BadRequestError(ERROR_MESSAGES.INVALID_TOKEN);
    }

    const splitBearer = token.replace('Bearer ', '');
    const decoder = new JWTEncoder();
    const decoded = await decoder.validate(splitBearer);
    if (!decoded) {
        throw new BadRequestError(ERROR_MESSAGES.ERROR_DECODING_TOKEN);
    }

    req.body.isAdmin = decoded['isAdmin'];
    req.body.user = decoded['user'];
    req.body.userId = decoded['user']['id']
    next();
};