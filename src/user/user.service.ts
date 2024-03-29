import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Post } from './entities/post.entity';
import { Role } from './entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const profile = new Profile({
      ...createUserDto.profile,
      fullName: 'Full name',
    });
    const roles = createUserDto.roles.map(
      (createRoleDto) => new Role(createRoleDto),
    );
    const user = new User({
      ...createUserDto,
      posts: [],
      roles,
      profile,
    });
    await this.entityManager.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: { profile: true, posts: true, roles: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    user.username = updateUserDto.username;
    const posts = updateUserDto.posts.map(
      (createPostDto) => new Post(createPostDto),
    );
    user.posts = posts;
    await this.entityManager.save(user);
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
