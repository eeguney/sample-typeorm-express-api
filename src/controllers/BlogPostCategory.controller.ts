import { Request, RequestHandler, Response } from "express";
import STATUS_CODE from "../constants/statuscodes";
import { BlogPostCategory } from "../entity/BlogPostCategory.entity";
import BlogPostCategoryService from "../services/BlogPostCategory.service";
import logger from "../utils/logger";

export default class BlogPostCategoryController {
  private blogPostCategoryService: BlogPostCategoryService;
  constructor(blogPostCategoryService: BlogPostCategoryService) {
    this.blogPostCategoryService = blogPostCategoryService;
  }

  getAllBlogPostCategory: RequestHandler = async (req: Request, res: Response) => {
    const query = req.query;
    try {
      const data = await this.blogPostCategoryService.getAllBlogPostCategory(query);
      return res.status(STATUS_CODE.SUCCESS.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
    }
  };

  addNewBlogPostCategory: RequestHandler = async (req: Request, res: Response) => {
    const theBlogPostCategory: BlogPostCategory = req.body;
    try {
      const data = await this.blogPostCategoryService.addNewBlogPostCategory(theBlogPostCategory);
      logger.info(`Category created with title: ${theBlogPostCategory.title}`);
      return res.status(STATUS_CODE.SUCCESS.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
    }
  };

  deleteAnBlogPostCategoryWithId: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const data = await this.blogPostCategoryService.deleteAnBlogPostCategoryWithId(Number(id));
      logger.info(`Category deleted`);
      return res.status(STATUS_CODE.SUCCESS.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
    }
  }
}
