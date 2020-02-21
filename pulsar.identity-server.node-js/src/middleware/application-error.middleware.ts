import { Request, Response } from "express";

export function errorHandling(err: Error, req: Request, res: Response, next: any) {
    console.log(err);
    res.status(500).send("Server Error" + err.message);
}
