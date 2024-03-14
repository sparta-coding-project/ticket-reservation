import { ROLE } from "../entities/user.entity";

export class CreateUserDto {
  email:string;
  password: string;
  role: ROLE
}
