import { Response } from 'express';

function sendResponse(res: Response, status: 'success' | 'error', code: number, message: string, data: any = null): Response {
    return res.status(code).json({ status, code, message, data });
}

interface ResponseObject {
    status: 'success' | 'error';
    code: number;
    message: string;
    data: any;
}

function createResponseObject(status: 'success' | 'error', code: number, message: string, data: any = null): ResponseObject {
    return {
        status,
        code,
        message,
        data
    };
}

export {
    sendResponse,
    createResponseObject
};