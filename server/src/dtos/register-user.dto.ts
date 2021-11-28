import { UserRoles } from 'src/entities/user.entity';

export class RegisterUserDTO {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: UserRoles;
}
