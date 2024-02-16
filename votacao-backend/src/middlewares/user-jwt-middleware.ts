import { NextFunction } from "express";
import { JWTEncoder } from "../data-parsers/credentials/jwt-encoder";
import { Request, Response } from "express";
import { BadRequestError } from "../exceptions/bad-request-error";
import { ERROR_MESSAGES } from "../exceptions/erro-messages";

export async function UserJWTMiddleware(req: Request, res: Response, next: NextFunction) {
    //this middleware does not prevent user from accessing the endpoint, 
    //it just sets the user and userId in the request body to be user by the controller
    const token = req.headers.authorization;
    console.log(token);
    if (token === undefined) {
        req.body.user = undefined;
        req.body.userId = undefined;
        req.body.isAdmin = false;
        return next();
    }

    const splitBearer = token!.replace('Bearer ', '');
    const decoder = new JWTEncoder();

    //if we can't decode the token, we just set the user and userId to undefined
    //if this try/catch block is not here, the application would send a 500 error
    try {
        const decoded = await decoder.validate(splitBearer);
        req.body.isAdmin = decoded['isAdmin'];
        req.body.user = decoded['user'];
        req.body.userId = decoded['user']['id']
        next();
    }
    catch (e) {
        req.body.isAdmin = false;
        req.body.user = undefined;
        req.body.userId = undefined;
        return next();
    }
};