import { EntityRepository, Repository } from 'typeorm';

import { User } from 'src/entities';
import { JWTPayloadDTO, RegisterUserDTO } from 'src/dtos';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }

  async add(registerUserDTO: RegisterUserDTO): Promise<User> {
    const user = { ...new User(), ...registerUserDTO };
    return this.save(user);
  }

  async findUserById(user: JWTPayloadDTO): Promise<User> {
    console.log({ user });
    return this.findOne({ id: parseInt(user.userId) });
  }
}
