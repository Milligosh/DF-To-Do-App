import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../helpers/response';

/**
 * Error response middleware for 404 not found.
 *
 * @param {Request} req
 * @param {Response} res
 */
export function notFound(req: Request, res: Response): void {
    sendResponse(res, 'error', 404, 'Ooops, route not found');
}

/**
 * Error response middleware for handling all app errors except generic errors.
 *
 * @param  {Error}   err
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 */
export function appErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    if ((err as any).code && typeof (err as any).code === 'number') {
        console.log(`
            status - ${(err as any).code}
            message - ${err.message} 
            url - ${req.originalUrl} 
            method - ${req.method} 
            IP - ${req.ip}
        `);

        sendResponse(res, 'error', (err as any).code, err.message);
    } else {
        next(err);
    }
}

/**
 * Generic error response middleware for internal server errors.
 *
 * @param  {Error}   err
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 */
export function genericErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    console.log(`
        status - 500 
        message - ${err.stack} 
        url - ${req.originalUrl} 
        method - ${req.method} 
        IP - ${req.ip}
    `);

    sendResponse(res, 'error', 500, err.message);
}