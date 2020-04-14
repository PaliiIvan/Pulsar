import { NextFunction, Request, Response } from "express";
import axios from "axios";

import { IDENTITY_URL } from "../configs/secrets";

export async function postCreateChannel(req: Request, res: Response, next: NextFunction) {

    const authToken = res.getHeader('Authorization');

    const authResult = await axios.post(`${IDENTITY_URL!}/check-token`, {token: authToken});
}

