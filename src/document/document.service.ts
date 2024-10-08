import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDocumentDto } from './dtos/createDocument.dto';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async create(createDocumentDto: CreateDocumentDto, userId: number) {
    const { title, content } = createDocumentDto;

    const document = await this.prisma.document.create({
      data: {
        title,
        content,
        changes: {
          create: {
            content,
            userId,
          },
        },
      },
    });

    return document;
  }

  async findAll() {
    return this.prisma.document.findMany();
  }

  async findOne(id: number) {
    return this.prisma.document.findUnique({
      where: { id },
      include: { changes: { include: { user: true } } },
    });
  }
}
