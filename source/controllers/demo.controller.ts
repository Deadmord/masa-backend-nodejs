import { Request, Response, NextFunction } from 'express';

const getHelloworld = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'Hello world!!!'
    });
};

const getWithTimeout = async (req: Request, res: Response, next: NextFunction) => {
    setTimeout(() => {
        return res.status(200).json({
            message: 'Ping is OK, Timeout in 3000ms'
        });
    }, 3000);

};

const getWithDelay = async (req: Request, res: Response, next: NextFunction) => {
    //Read delay from getting paramrtr
    let delayINSeconds: number = parseInt(req.params.seconds);

    setTimeout(() => {
        return res.status(200).json({
            message: `Ping is OK, Timeout in ${delayINSeconds} sec`
        });
    }, delayINSeconds * 1000);
};

const getWithDelayValidated = async (req: Request, res: Response, next: NextFunction) => {
    //Read delay from getting paramrtr
    const secondsStringParametr: string =req.params.seconds;
    if(isNaN(Number(secondsStringParametr))){
        //Error
        //return res.status(406).json({
        //    error: "Incoret seconds parametr value"
        //});

        //Error w/o messege
        return res.sendStatus(406);
    }
    /*
    let delayINSeconds: number = parseInt(req.params.seconds);
    if(isNaN(delayINSeconds)) {
        //Error
        return res.status(406).json({
            error: "Incoret seconds parametr value"
        });
    }
    */
    else {
    let delayInSeconds: number = parseInt(req.params.seconds);
    setTimeout(() => {
        return res.status(200).json({
            message: `Ping is OK, Timeout in ${delayInSeconds} sec`
        });
    }, delayInSeconds * 1000);
}
};

export default { getHelloworld, getWithTimeout, getWithDelay, getWithDelayValidated};