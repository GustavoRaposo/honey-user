import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string; expires_in: number }> {
    const user = await this.userRepository.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Verificar se a senha está correta usando bcrypt
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Remover a senha do objeto user antes de criar o payload
    const { password, ...userWithoutPassword } = user;

    // Criar payload do JWT com todas as informações do usuário (exceto senha)
    const payload = {
      sub: user.id, // Manter o 'sub' para compatibilidade com padrões JWT
      ...userWithoutPassword, // Incluir todas as outras propriedades
    };

    // Gerar token JWT
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      expires_in: 3600, // 1 hora em segundos
    };
  }

  async validateUser(payload: any) {
    const user = await this.userRepository.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    
    // Remover a senha antes de retornar o usuário
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}