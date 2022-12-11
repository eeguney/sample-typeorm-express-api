import myDataSource from "../data-source";
import { DeleteResult, Repository } from "typeorm";
import { BlogPost } from "../entity/BlogPost.entity";

export default class BlogPostService {
  private blogPostRepository: Repository<BlogPost>;
  constructor() {
    this.blogPostRepository = myDataSource.getRepository(BlogPost);
  }

  public async getAllBlogPost(query: any): Promise<BlogPost[]> {
    const limit = query.itemPerPage ?? 20;
    const page = query.page ?? 1;
    const skip = limit * (page - 1) ?? 0;
    const allBlogPost: BlogPost[] = await this.blogPostRepository
      .createQueryBuilder("blogpost")
      .limit(limit)
      .skip(skip)
      .orderBy("blogpost.id", query.sort)
      .getMany();
    if (allBlogPost.length == 0) {
      throw "There is no record..";
    }
    return allBlogPost;
  }

  public async addNewBlogPost(blogPost: BlogPost): Promise<BlogPost> {
    if (!blogPost.title || !blogPost.text || !blogPost.slug || !blogPost.user) throw "Bad request";
    return await this.blogPostRepository.save(blogPost);
  }

  public async deleteAnBlogPostWithId(id: number): Promise<DeleteResult> {
    if(!id) throw "Id cannot be empty";
    const thatBlogPost = await this.blogPostRepository.findOneBy({ id });
    if(!thatBlogPost) throw "There is no blog post with this Id";
    return await this.blogPostRepository.delete({ id: thatBlogPost.id });
  }
  
}
