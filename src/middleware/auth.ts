import { Request, Response, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";

export class userReq {
  userId: any;
  type: any;
}
// add currUser to the request interface
declare module "express-serve-static-core" {
  interface Request {
    currUser?: userReq;
  }
  interface Response {
    currUser?: userReq;
  }
}

export default async function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader: string = <string>(
      (req.headers["authorization"] || req.headers["Authorization"])
    );
    const token = authorizationHeader.split(" ")[1];
    const payload = <any>verify(token, process.env.JWT_SECRET);
    const { userId, type } = payload;
    req.currUser = { userId, type };
  } catch (err) {
    res.sendStatus(401);
    return;
  }
  next();
}
