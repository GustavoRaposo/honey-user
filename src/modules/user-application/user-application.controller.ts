import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserApplicationService } from './user-application.service';
import { CreateUserApplicationDto } from './dto/create-user-application.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('User-Application')
@Controller('user-application')
@UseGuards(JwtAuthGuard)
export class UserApplicationController {
  constructor(
    private readonly userApplicationService: UserApplicationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Relacionar um usuário a uma aplicação' })
  @ApiResponse({
    status: 201,
    description: 'O relacionamento foi criado com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Usuário ou aplicação não encontrados.' })
  create(@Body() createUserApplicationDto: CreateUserApplicationDto) {
    return this.userApplicationService.create(createUserApplicationDto);
  }

  @Get('user/:userId/applications')
  @ApiOperation({ summary: 'Listar todas as aplicações que um usuário está relacionado' })
  findUserApplications(@Param('userId') userId: string) {
    return this.userApplicationService.findUserApplications(userId);
  }

  @Get('user/:userId/not-in-applications')
  @ApiOperation({ summary: 'Listar todas as aplicações que um usuário não está relacionado' })
  findUserNotInApplications(@Param('userId') userId: string) {
    return this.userApplicationService.findUserNotInApplications(userId);
  }

  @Get('application/:applicationId/users')
  @ApiOperation({ summary: 'Listar todos os usuários que uma aplicação está relacionado' })
  findApplicationUsers(@Param('applicationId') applicationId: string) {
    return this.userApplicationService.findApplicationUsers(applicationId);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover relacionamento de um usuário a uma aplicação' })
  @ApiResponse({
    status: 204,
    description: 'O relacionamento foi removido com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Relacionamento não encontrado.' })
  remove(@Body() createUserApplicationDto: CreateUserApplicationDto) {
    return this.userApplicationService.remove(
      createUserApplicationDto.userId,
      createUserApplicationDto.applicationId,
    );
  }
}
