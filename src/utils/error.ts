import { Request, Response, NextFunction } from "express"
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

const catchAsync = (func: { (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void>; (arg0: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, arg1: Response<any, Record<string, any>>, arg2: NextFunction): Promise<any>; }) => {
    return(req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch((error) => next({
            error
        }))
    }
};

const globalErrorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): Response => {
    if(err) {
        return res.status(400).json({ message: 'Key Error'})
    }
    return res.status(500).json({ message: "Inter Server Error"})
}

export { catchAsync, globalErrorHandler }