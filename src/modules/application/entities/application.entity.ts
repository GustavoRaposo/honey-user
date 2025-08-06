import { ApiProperty } from '@nestjs/swagger';

export class ApplicationEntity {
  @ApiProperty({
    example: '00000000-0000-0000-0000-000000000000',
    description: 'The unique identifier of the application',
  })
  id: string;

  @ApiProperty({
    example: 'My App',
    description: 'The name of the application',
  })
  name: string;

  @ApiProperty({
    example: 'This is a description of my application.',
    description: 'The description of the application',
  })
  description: string;
}
