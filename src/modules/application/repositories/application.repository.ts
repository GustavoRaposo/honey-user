import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';

@Injectable()
export class ApplicationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createApplicationDto: CreateApplicationDto) {
    return this.prisma.application.create({
      data: createApplicationDto,
    });
  }

  async findAll() {
    return this.prisma.application.findMany();
  }

  async findOne(id: string) {
    return this.prisma.application.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    return this.prisma.application.findFirst({
      where: { name },
    });
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    return this.prisma.application.update({
      where: { id },
      data: updateApplicationDto,
    });
  }

  async remove(id: string) {
    return this.prisma.application.delete({
      where: { id },
    });
  }
}
