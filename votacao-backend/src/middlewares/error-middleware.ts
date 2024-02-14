import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../exceptions/api-error';

export function errorHandler(err: Error & Partial<ApiError>, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    const errorMessage = err.message || 'Internal Server Error';
    res.statusMessage = errorMessage;
    res.status(err.statusCode || 500).send(errorMessage);
}
