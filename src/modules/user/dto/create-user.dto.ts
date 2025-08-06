import { IsEmail, IsNotEmpty, IsOptional, IsDateString, MinLength, Length} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

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
}
