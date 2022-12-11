import { Router } from "express";
import BlogPostRoute from "./BlogPost.route";
import BlogPostCategoryRoute from "./BlogPostCategory.route";
import UserRouter from "./User.route";

class MainRouter {
  private router;
  constructor() {
    this.router = Router() as Router;
  }
  main(): Router {
    this.router.use("/users", UserRouter);
    this.router.use("/blog-posts", BlogPostRoute);
    this.router.use("/blog-post-categories", BlogPostCategoryRoute);
    return this.router;
  }
}

export default new MainRouter().main();
