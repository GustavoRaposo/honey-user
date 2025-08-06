import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard) // Aplicar autenticação JWT a todas as rotas
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @CurrentUser() currentUser: any,
  ): Promise<UserResponse> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(@CurrentUser() currentUser: any): Promise<UserResponse[]> {
    return this.userService.findAll();
  }

  @Get('stats')
  async getStats(@CurrentUser() currentUser: any): Promise<{ totalUsers: number }> {
    return this.userService.getStats();
  }

  @Get('profile')
  async getProfile(@CurrentUser() currentUser: any): Promise<UserResponse> {
    return this.userService.findOne(currentUser.id);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUser() currentUser: any,
  ): Promise<UserResponse> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: any,
  ): Promise<UserResponse> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id') id: string,
    @CurrentUser() currentUser: any,
  ): Promise<void> {
    return this.userService.remove(id);
  }
}
