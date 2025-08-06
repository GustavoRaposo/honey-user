import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateUserApplicationDto } from './dto/create-user-application.dto';

@Injectable()
export class UserApplicationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserApplicationDto: CreateUserApplicationDto) {
    const { userId, applicationId } = createUserApplicationDto;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
    });
    if (!application) {
      throw new NotFoundException(
        `Application with ID "${applicationId}" not found`,
      );
    }

    return this.prisma.userApplication.create({
      data: {
        userId,
        applicationId,
      },
    });
  }

  findUserApplications(userId: string) {
    return this.prisma.application.findMany({
      where: {
        userApplications: {
          some: {
            userId,
          },
        },
      },
    });
  }

  findUserNotInApplications(userId: string) {
    return this.prisma.application.findMany({
      where: {
        userApplications: {
          none: {
            userId,
          },
        },
      },
    });
  }

  findApplicationUsers(applicationId: string) {
    return this.prisma.user.findMany({
      where: {
        userApplications: {
          some: {
            applicationId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        city: true,
        estate: true,
        country: true,
        birthDate: true,
        registeredWhen: true,
        updatedWhen: true,
      },
    });
  }

  async remove(userId: string, applicationId: string) {
    const userApplication = await this.prisma.userApplication.findUnique({
      where: {
        userId_applicationId: {
          userId,
          applicationId,
        },
      },
    });

    if (!userApplication) {
      throw new NotFoundException('User application relationship not found.');
    }

    return this.prisma.userApplication.delete({
      where: {
        userId_applicationId: {
          userId,
          applicationId,
        },
      },
    });
  }
}
