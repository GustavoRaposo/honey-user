import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({
    example: 'My App',
    description: 'The name of the application',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: 'This is a description of my application.',
    description: 'The description of the application',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @ApiProperty({
    example: 'user-1234',
    description: 'ID of the user who created the application',
  })
  @IsString()
  @IsNotEmpty()
  createdById: string;

  @ApiProperty({
    example: 'user-1234',
    description: 'ID of the user who last updated the application',
  })
  @IsString()
  @IsNotEmpty()
  updatedById: string;
}
