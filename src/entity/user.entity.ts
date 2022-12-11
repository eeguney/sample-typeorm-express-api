import { IsEmail, IsNotEmpty, Max, Min } from "class-validator";
import { Entity, Column, OneToMany } from "typeorm";
import BaseEntity from "./Base.entity";
import { BlogPost } from "./BlogPost.entity";

@Entity()
export class User extends BaseEntity {

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ unique: true })
  @Min(3)
  @Max(20)
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @Min(8)
  @Max(24)
  password: string;

  @OneToMany(() => BlogPost, (blogpost) => blogpost.user)
  blogposts: BlogPost[]
  
}
