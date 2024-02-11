import { NextFunction } from "express";
import { JWTEncoder } from "../data-parsers/credentials/jwt-encoder";
import { Request, Response } from "express";

export async function UserJWTMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
        throw new Error('No token provided');
    }

    const splitBearer = token.split(' ')[1];
    if (!splitBearer) {
        throw new Error('Invalid token');
    }

    const decoder = new JWTEncoder();
    const decoded = await decoder.validate(splitBearer);
    if (!decoded) {
        throw new Error('Error Decoding Token');
    }

    req.body.user = decoded;
    next();

};