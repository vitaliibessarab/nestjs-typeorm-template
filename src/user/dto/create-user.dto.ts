import { CreateProfileDto } from './create-profile.dto';
import { CreateRoleDto } from './create-role.dto';

export class CreateUserDto {
  username: string;
  profile: CreateProfileDto;
  roles: CreateRoleDto[];
}
