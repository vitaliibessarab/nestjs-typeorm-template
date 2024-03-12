import { CreateProfileDto } from './create-profile.dto';

export class CreateUserDto {
  username: string;
  profile: CreateProfileDto;
}
