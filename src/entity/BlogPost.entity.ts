import { MaxLength, MinLength } from "class-validator";
import { Entity, Column, ManyToOne, RelationId } from "typeorm";
import BaseEntity from "./Base.entity";
import { BlogPostCategory } from "./BlogPostCategory.entity";
import { User } from "./User.entity";

@Entity()
export class BlogPost extends BaseEntity {

  @Column({ unique: true })
  @MinLength(10)
  @MaxLength(120)
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: false })
  text: string;

  @ManyToOne(() => BlogPostCategory, (category) => category.blogposts)
  category: number;

  @RelationId((blogPost: BlogPost) => blogPost.category)
  categoryId: number;

  @ManyToOne(() => User, (user) => user.blogposts)
  user: User;

  @RelationId((blogPost: BlogPost) => blogPost.user)
  userId: number;
}
