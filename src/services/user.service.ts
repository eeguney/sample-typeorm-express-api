import { User } from "../entity/user.entity";
import myDataSource from "../data-source";
import { Repository } from "typeorm";

export default class UserService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = myDataSource.getRepository(User);
  }

  public async getAllUsers(query: any): Promise<User[]> {
    const limit = query.itemPerPage ?? 20;
    const page = query.page ?? 1;
    const skip = limit * (page - 1) ?? 0;
    const allUsers: User[] = await this.userRepository
      .createQueryBuilder("user")
      .limit(limit)
      .skip(skip)
      .orderBy("user.id", query.sort)
      .getMany();
    if (allUsers.length == 0) {
      throw "There is no record..";
    }
    return allUsers;
  }

  public async addNewUser(user: User): Promise<User> {
    if (!user.firstName || !user.lastName) {
      throw "Bad request";
    }
    return await this.userRepository.save(user);
  }
}
