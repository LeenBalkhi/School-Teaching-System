import { Request, Response } from "express";
import { PostService } from "../services/index";
import CustomResponse, { ResponseStatus } from "../utils/customResponse";
import { badRequestHandler, responseHandler } from "../utils/helperes";
import Post from "../entities/Post";
import PostDto from "../models/post.dto";

export const get = async (req: Request, res: Response) => {
  try {
    const { postId, schoolId, teacherId } = req.query;
    let result: Post | Post[];
    if (postId)
      result = await PostService.get(postId as string, teacherId as string);
    else if (schoolId)
      result = await PostService.getSchoolList(schoolId as string);
    else result = await PostService.getList();
    responseHandler(null, res, result);
  } catch (error) {
    console.log("error", error)
    badRequestHandler("Error Getting Post Info.", res, error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const result = await PostService.create(req.body as PostDto);
    responseHandler("Post Created Successfully.", res, result);
  } catch (error) {
    badRequestHandler("Error Creating Post.", res, error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { postId } = req.query;
    const result = await PostService.update(
      postId as string,
      req.body as PostDto
    );
    responseHandler("Post Updated Successfully.", res, result);
  } catch (error) {
    badRequestHandler("Error Updating Post.", res, error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { postId } = req.query;
    await PostService.remove(postId as string);
    responseHandler("Post Deleted Successfully.", res);
  } catch (error) {
    badRequestHandler("Error Deleting Post.", res, error);
  }
};
