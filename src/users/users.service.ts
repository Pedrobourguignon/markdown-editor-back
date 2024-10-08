import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { hash } from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { email, name, password } = createUserDto;

      const userAlreadyExists = await this.findByEmail(createUserDto.email);

      if (userAlreadyExists) {
        throw new BadRequestException(
          `User with email: ${createUserDto.email} already exists`,
        );
      }

      const hashedPassword = await hash(password, saltOrRounds);

      return this.prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });
    } catch {
      throw new BadRequestException(
        `User with email: ${createUserDto.email} already exists`,
      );
    }
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
