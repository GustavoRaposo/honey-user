import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
export declare class JwtAuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly authService;
    constructor(jwtService: JwtService, authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
