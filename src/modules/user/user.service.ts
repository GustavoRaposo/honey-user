import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { UserResponse } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    // Verificar se email já existe
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.userRepository.create(createUserDto);
    return this.excludePassword(user);
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => this.excludePassword(user));
  }

  async findOne(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.excludePassword(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponse> {
    // Verificar se usuário existe
    await this.findOne(id);

    // Se está atualizando email, verificar se não existe outro usuário com esse email
    if (updateUserDto.email) {
      const existingUser = await this.userRepository.findByEmail(updateUserDto.email);
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    const user = await this.userRepository.update(id, updateUserDto);
    return this.excludePassword(user);
  }

  async remove(id: string): Promise<void> {
    // Verificar se usuário existe
    await this.findOne(id);

    await this.userRepository.remove(id);
  }

  async getStats(): Promise<{ totalUsers: number }> {
    const totalUsers = await this.userRepository.count();
    return { totalUsers };
  }

  private excludePassword(user: any): UserResponse {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
