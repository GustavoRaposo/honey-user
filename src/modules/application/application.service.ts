import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationRepository } from './repositories/application.repository';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
  ) {}

  async create(createApplicationDto: CreateApplicationDto) {
    const existingApplication = await this.applicationRepository.findByName(
      createApplicationDto.name,
    );
    if (existingApplication) {
      throw new ConflictException('Application with this name already exists');
    }
    return this.applicationRepository.create(createApplicationDto);
  }

  async findAll() {
    return this.applicationRepository.findAll();
  }

  async findOne(id: string) {
    const application = await this.applicationRepository.findOne(id);
    if (!application) {
      throw new NotFoundException(`Application with id ${id} not found`);
    }
    return application;
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    await this.findOne(id);
    if (updateApplicationDto.name) {
      const existingApplication = await this.applicationRepository.findByName(
        updateApplicationDto.name,
      );
      if (existingApplication && existingApplication.id !== id) {
        throw new ConflictException(
          'Application with this name already exists',
        );
      }
    }
    return this.applicationRepository.update(id, updateApplicationDto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.applicationRepository.remove(id);
  }
}
