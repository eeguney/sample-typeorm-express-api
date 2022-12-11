import myDataSource from "../data-source";
import { DeleteResult, Repository } from "typeorm";
import { BlogPostCategory } from "../entity/BlogPostCategory.entity";

export default class BlogPostCategoryService {
  private blogPostCategoryRepository: Repository<BlogPostCategory>;
  constructor() {
    this.blogPostCategoryRepository = myDataSource.getRepository(BlogPostCategory);
  }

  public async getAllBlogPostCategory(query: any): Promise<BlogPostCategory[]> {
    const limit = query.itemPerPage ?? 20;
    const page = query.page ?? 1;
    const skip = limit * (page - 1) ?? 0;
    const allBlogPostCategory: BlogPostCategory[] = await this.blogPostCategoryRepository
      .createQueryBuilder("blogpostcategories")
      .limit(limit)
      .skip(skip)
      .orderBy("blogpostcategories.id", query.sort)
      .getMany();
    if (allBlogPostCategory.length == 0) {
      throw "There is no record..";
    }
    return allBlogPostCategory;
  }

  public async addNewBlogPostCategory(blogPostCategory: BlogPostCategory): Promise<BlogPostCategory> {
    if (!blogPostCategory.title || !blogPostCategory.slug) throw "Bad request";
    return await this.blogPostCategoryRepository.save(blogPostCategory);
  }

  public async deleteAnBlogPostCategoryWithId(id: number): Promise<DeleteResult> {
    if(!id) throw "Id cannot be empty";
    const thatBlogPostCategory = await this.blogPostCategoryRepository.findOneBy({ id });
    if(!thatBlogPostCategory) throw "There is no blog post category with this Id";
    return await this.blogPostCategoryRepository.delete({ id: thatBlogPostCategory.id });
  }
  
}
