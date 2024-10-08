import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ReturnUserDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  createdAt: Date;
  updatedAt: Date;
}
