import { Request, Response } from "express";
import { AuthService } from "../services/index";
import LoginDto from "../models/login.dto";
import UserDto from "../models/user.dto";

export const login = async (req: Request, res: Response) => {
  const { email, password }: LoginDto = req.body;
  const result = await AuthService.login(email, password);
  res.send(result);
};

export const signup = async (req: Request, res: Response) => {
  const result = await AuthService.signup(req.body as UserDto);
  res.send(result);
};
