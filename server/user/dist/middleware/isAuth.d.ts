import type { NextFunction, Request, Response } from "express";
import type { IUser } from "../model/user.js";
export interface AuthentictedRequest extends Request {
    user?: IUser | null;
}
export declare const isAuth: (req: AuthentictedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=isAuth.d.ts.map