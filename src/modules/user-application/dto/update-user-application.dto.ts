import { PartialType } from '@nestjs/swagger';
import { CreateUserApplicationDto } from './create-user-application.dto';

export class UpdateUserApplicationDto extends PartialType(
  CreateUserApplicationDto,
) {}
