import { hash } from "bcrypt";
import User from "../entities/User";
import UserRepo from "../repositories/User";
import UserDto from "../models/user.dto";
import CustomResponse, { ResponseStatus } from "../utils/customResponse";

export const createUser = async (userInfo: UserDto): Promise<User> => {
  try {
    const user = new User();
    user.name = userInfo.name;
    user.email = userInfo.email;
    user.password = await hash(userInfo.password, process.env.BCRYPT_SALT);
    user.phone = userInfo.phone;
    user.address = userInfo.address;
    user.imageUrl = userInfo.imageUrl;
    user.isConfirmed = false;
    return await UserRepo.save(user);
  } catch (error) {
    let message =
      error.code == "ER_DUP_ENTRY" ? "The email already exist." : "";
    throw new CustomResponse(ResponseStatus.BAD_REQUEST, message, null, error);
  }
};

export const get = async (userId: string): Promise<User> => {
  const user = await UserRepo.findOne({ id: userId });
  if (!user) {
    throw new CustomResponse(
      ResponseStatus.BAD_REQUEST,
      "User does not exist."
    );
  }
  return user;
};

export const update = async (updatedUser: User) => {
  return await UserRepo.save(updatedUser);
};

export const remove = async (userId: string) => {
  const user: User = await get(userId);
  return await UserRepo.delete(user.id);
};
