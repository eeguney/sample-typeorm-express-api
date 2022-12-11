import { User } from "../entity/User.entity";
import myDataSource from "../data-source";
import { DeleteResult, Repository } from "typeorm";
import { DTORegister } from "../dto/user/DtoRegister";

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

  public async addNewUser(user: DTORegister): Promise<User> {
    if (!user.firstName || !user.lastName || !user.email || !user.password) throw "Bad request";
    return await this.userRepository.save(user);
  }

  public async deleteAnUserWithUsername(username: string): Promise<DeleteResult> {
    if(!username) throw "Username cannot be empty";
    const thatUser = await this.userRepository.findOneBy({ username });
    if(!thatUser) throw "There is no user with this Id";
    return await this.userRepository.delete({ id: thatUser.id });
  }
  
}
