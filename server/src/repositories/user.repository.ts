import { EntityRepository, Repository } from 'typeorm';

import { User } from 'src/entities';
import { RegisterUserDTO } from 'src/dtos';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }

  async add(registerUserDTO: RegisterUserDTO): Promise<User> {
    const user = { ...new User(), ...registerUserDTO };
    return this.save(user);
  }
}
