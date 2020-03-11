import jwt from "jsonwebtoken";

import * as userRepo from "../features/user/user.repository";
import { NotFoundError } from "../util/exeptions/server-errors";
import { STREAM_SECRET_KEY } from "../configs/secrets";

export async function generateStreamKey(userId: string) {

    const user = await userRepo.getUserById(userId);
    if (user == null)
        throw new NotFoundError("User not found", { userId: userId });

    const streamKey = jwt.sign({ UserId: userId, StreamId: "0f0140a4-f39f-468c-a27a-685ecbfd42f0" }, "3dae7f1e-6b38-4c5e-ba1d-eadaeac49129", {algorithm: "HS256"});
    
    return streamKey;
}