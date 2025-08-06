import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repositories/user.repository';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        expires_in: number;
    }>;
    validateUser(payload: any): Promise<{
        id: string;
        name: string;
        email: string;
        city: string | null;
        estate: string | null;
        country: string | null;
        birthDate: Date | null;
        registeredWhen: Date;
        updatedWhen: Date;
    }>;
}
