import { Request, Response } from "express";
import { TeacherService } from "../services";
import TeacherDto from "../models/teacher.dto";
import CustomResponse, { ResponseStatus } from "../utils/customResponse";
import UpdateTeacherDto from "models/updateTeacher.dto";

export const get = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.query;
    let result;
    if (!teacherId) result = await TeacherService.getList();
    else result = await TeacherService.get(teacherId as string);
    res.send(new CustomResponse(ResponseStatus.OK, null, result));
  } catch (error) {
    if (error instanceof CustomResponse) return res.send(error);
    res.send(new CustomResponse(ResponseStatus.BAD_REQUEST, null, null, error));
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const result = await TeacherService.create(req.body as TeacherDto);
    res.send(
      new CustomResponse(
        ResponseStatus.RESOURCE_CREATED,
        "Teacher Account Created Successfully.",
        result
      )
    );
  } catch (error) {
    if (error instanceof CustomResponse) return res.send(error);
    res.send(
      new CustomResponse(
        ResponseStatus.BAD_REQUEST,
        "Error Creating Teacher Account.",
        null,
        error
      )
    );
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.query;
    const result = await TeacherService.update(
      teacherId as string,
      req.body as UpdateTeacherDto
    );
    res.send(
      new CustomResponse(
        ResponseStatus.RESOURCE_CREATED,
        "Teacher Updated Successfully",
        result
      )
    );
  } catch (error) {
    if (error instanceof CustomResponse) return res.send(error);
    res.send(
      new CustomResponse(
        ResponseStatus.BAD_REQUEST,
        "Error Updating Teacher",
        null,
        error
      )
    );
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.query;
    const result = await TeacherService.remove(teacherId as string);
    res.send(
      new CustomResponse(ResponseStatus.OK, "Teacher Deleted Successfully")
    );
  } catch (error) {
    if (error instanceof CustomResponse) return res.send(error);
    res.send(
      new CustomResponse(
        ResponseStatus.BAD_REQUEST,
        "Error Deleting Teacher",
        null,
        JSON.stringify(error)
      )
    );
  }
};
