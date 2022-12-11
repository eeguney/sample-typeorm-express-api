import { Router } from "express";
import BlogPostController from "../controllers/BlogPost.controller";
import { BlogPost } from "../entity/BlogPost.entity";
import validation from "../middlewares/Validation.middleware";
import BlogPostService from "../services/BlogPost.service";

class BlogPostRoute {
  private userRouter: Router;
  service: BlogPostService;
  controller: BlogPostController;
  constructor() {
    this.userRouter = Router() as Router;
    this.service = new BlogPostService();
    this.controller = new BlogPostController(this.service);
  }

  main(): Router {
    this.userRouter.get("/", this.controller.getAllBlogPost);
    this.userRouter.post(
      "/",
      [validation(BlogPost)],
      this.controller.addNewBlogPost
    );
    this.userRouter.delete("/:id", this.controller.deleteAnBlogPostWithId);
    return this.userRouter;
  }
}

export default new BlogPostRoute().main();
