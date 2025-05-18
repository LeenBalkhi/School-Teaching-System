import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import User from "../entities/User";
import UserRepository from "../repositories/User";
import CustomResponse, { ResponseStatus } from "../utils/customResponse";
import { UserService } from "../services/index";
import UserDto from "../models/user.dto";

export const login = async (email: string, password: string) => {
  try {
    let user: User;
    try {
      user = await UserRepository.findByEmail(email);
    } catch (error) {
      return new CustomResponse(
        ResponseStatus.UNAUTHORIZED,
        "Email Does not Exists."
      );
    }
    let compareResult = await compare(password, user.password);
    if (!compareResult)
      return new CustomResponse(ResponseStatus.UNAUTHORIZED, "Wrong Password.");
    let payload = { userId: user.id, type: user.profileType };
    let token = sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
    return new CustomResponse(ResponseStatus.OK, "Logged In Successfully", {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        imageUrl: user.imageUrl,
        isConfirmed: user.isConfirmed,
        profileId: user.profileId,
        profileType: user.profileType,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return new CustomResponse(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      "",
      null,
      error
    );
  }
};

export const signup = async (signupDto: UserDto) => {
  try {
    const createdUser = await UserService.createUser(signupDto);
    const loginRes = await login(signupDto.email, signupDto.password);
    return new CustomResponse(
      ResponseStatus.RESOURCE_CREATED,
      "Signed up Successfully.",
      loginRes.data
    );
  } catch (error) {
    if (error instanceof CustomResponse) return error;
    return new CustomResponse(ResponseStatus.BAD_REQUEST, "", null, error);
  }
};
