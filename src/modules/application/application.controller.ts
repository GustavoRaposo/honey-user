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
  UseGuards,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApplicationEntity } from './entities/application.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('applications')
@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new application' })
  @ApiResponse({
    status: 201,
    description: 'The application has been successfully created.',
    type: ApplicationEntity,
  })
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createApplicationDto: CreateApplicationDto,
    @CurrentUser() currentUser: any,
  ) {
    createApplicationDto.createdById = currentUser.id;
    createApplicationDto.updatedById = currentUser.id;
    return this.applicationService.create(createApplicationDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all applications' })
  @ApiResponse({
    status: 200,
    description: 'A list of applications.',
    type: [ApplicationEntity],
  })
  findAll() {
    return this.applicationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an application by id' })
  @ApiResponse({
    status: 200,
    description: 'The application.',
    type: ApplicationEntity,
  })
  findOne(@Param('id') id: string) {
    return this.applicationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an application' })
  @ApiResponse({
    status: 200,
    description: 'The application has been successfully updated.',
    type: ApplicationEntity,
  })
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
    @CurrentUser() currentUser: any,
  ) {
    updateApplicationDto.updatedById = currentUser.id;
    return this.applicationService.update(id, updateApplicationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an application' })
  @ApiResponse({
    status: 204,
    description: 'The application has been successfully deleted.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.applicationService.remove(id);
  }
}
