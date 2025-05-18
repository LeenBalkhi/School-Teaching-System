import { Request, Response } from "express";
import { badRequestHandler, responseHandler } from "../utils/helperes";
import { TeacherCertificateService } from "../services";
import CustomResponse, { ResponseStatus } from "../utils/customResponse";
import TeacherCertificate from "../entities/TeacherCertificate";
import { TeacherCertificateDto } from "../models/teacherCertificate.dto";

export const get = async (req: Request, res: Response) => {
  try {
    const { certificateId, teacherId } = req.query;
    let result: TeacherCertificate | TeacherCertificate[];
    if (certificateId)
      result = await TeacherCertificateService.get(certificateId as string);
    else if (teacherId)
      result = await TeacherCertificateService.getList(teacherId as string);
    else
      throw new CustomResponse(
        ResponseStatus.BAD_REQUEST,
        "certificateId Or teacherId must be passed."
      );
    responseHandler(null, res, result);
  } catch (error) {
    badRequestHandler("Error Getting Teacher Certificate Info.", res, error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const result = await TeacherCertificateService.create(
      req.body as TeacherCertificateDto
    );
    responseHandler("Teacher Certificate Created Successfully.", res, result);
  } catch (error) {
    badRequestHandler("Error Creating Teacher Certificate.", res, error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { certificateId } = req.query;
    const result = await TeacherCertificateService.update(
      certificateId as string,
      req.body as TeacherCertificateDto
    );
    responseHandler("Teacher Certificate Updated Successfully.", res, result);
  } catch (error) {
    badRequestHandler("Error Updating Teacher Certificate.", res, error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { certificateId } = req.query;
    await TeacherCertificateService.remove(certificateId as string);
    responseHandler("Teacher Certificate Deleted Successfully.", res);
  } catch (error) {
    badRequestHandler("Error Deleting Teacher Certificate.", res, error);
  }
};
