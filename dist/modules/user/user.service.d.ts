import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { UserResponse } from './entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    create(createUserDto: CreateUserDto): Promise<UserResponse>;
    findAll(): Promise<UserResponse[]>;
    findOne(id: string): Promise<UserResponse>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponse>;
    remove(id: string): Promise<void>;
    getStats(): Promise<{
        totalUsers: number;
    }>;
    private excludePassword;
}
