import { Request, RequestHandler, Response } from "express";
import STATUS_CODE from "../constants/statuscodes";
import { BlogPost } from "../entity/BlogPost.entity";
import BlogPostService from "../services/BlogPost.service";
import logger from "../utils/logger";

export default class BlogPostController {
  private blogPostService: BlogPostService;
  constructor(blogPostService: BlogPostService) {
    this.blogPostService = blogPostService;
  }

  getAllBlogPost: RequestHandler = async (req: Request, res: Response) => {
    const query = req.query;
    try {
      const data = await this.blogPostService.getAllBlogPost(query);
      return res.status(STATUS_CODE.SUCCESS.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
    }
  };

  addNewBlogPost: RequestHandler = async (req: Request, res: Response) => {
    const theBlogPost: BlogPost = req.body;
    try {
      const data = await this.blogPostService.addNewBlogPost(theBlogPost);
      logger.info(`Blog post created with title: ${theBlogPost.title}`);
      return res.status(STATUS_CODE.SUCCESS.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
    }
  };

  deleteAnBlogPostWithId: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const data = await this.blogPostService.deleteAnBlogPostWithId(Number(id));
      logger.info(`Blog post deleted`);
      return res.status(STATUS_CODE.SUCCESS.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
    }
  }
}
