import { Router } from "express";
import BlogPostCategoryController from "../controllers/BlogPostCategory.controller";
import { BlogPostCategory } from "../entity/BlogPostCategory.entity";
import validation from "../middlewares/Validation.middleware";
import BlogPostCategoryService from "../services/BlogPostCategory.service";

class BlogPostCategoryRoute {
  private userRouter: Router;
  service: BlogPostCategoryService;
  controller: BlogPostCategoryController;
  constructor() {
    this.userRouter = Router() as Router;
    this.service = new BlogPostCategoryService();
    this.controller = new BlogPostCategoryController(this.service);
  }

  main(): Router {
    this.userRouter.get("/", this.controller.getAllBlogPostCategory);
    this.userRouter.post(
      "/",
      [validation(BlogPostCategory)],
      this.controller.addNewBlogPostCategory
    );
    this.userRouter.delete("/:id", this.controller.deleteAnBlogPostCategoryWithId);
    return this.userRouter;
  }
}

export default new BlogPostCategoryRoute().main();
