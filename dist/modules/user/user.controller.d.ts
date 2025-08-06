import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto, currentUser: any): Promise<UserResponse>;
    findAll(currentUser: any): Promise<UserResponse[]>;
    getStats(currentUser: any): Promise<{
        totalUsers: number;
    }>;
    getProfile(currentUser: any): Promise<UserResponse>;
    findOne(id: string, currentUser: any): Promise<UserResponse>;
    update(id: string, updateUserDto: UpdateUserDto, currentUser: any): Promise<UserResponse>;
    remove(id: string, currentUser: any): Promise<void>;
}
