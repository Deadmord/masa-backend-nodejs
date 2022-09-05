import { Request, Response, NextFunction } from 'express';

const getHelloworld = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'Hello world!!!'
    });
};

export default { getHelloworld };