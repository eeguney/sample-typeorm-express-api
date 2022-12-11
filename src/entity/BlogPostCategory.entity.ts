import { MaxLength, MinLength } from "class-validator";
import { Entity, Column, OneToMany } from "typeorm";
import BaseEntity from "./Base.entity";
import { BlogPost } from "./BlogPost.entity";

@Entity()
export class BlogPostCategory extends BaseEntity {

  @Column({ unique: true })
  @MinLength(3)
  @MaxLength(40)
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  info?: string;

  @OneToMany(() => BlogPost, (blogpost) => blogpost.category)
  blogposts: BlogPost[]
}
