import { CreatePostDto } from './create-post.dto';

export class UpdateUserDto {
  username: string;
  posts: CreatePostDto[];
}
