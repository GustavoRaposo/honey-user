import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsEmail, MinLength, IsDateString, IsBoolean, Length} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  city?: string;

  @IsOptional()
  @Length(2, 2, { message: 'estate deve ter exatamente 2 caracteres' })
  estate?: string;

  @IsOptional()
  country?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}