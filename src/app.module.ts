import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EditorGateway } from './editor/editor.gateway';
import { EditorModule } from './editor/editor.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { DocumentService } from './document/document.service';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    JwtModule,
    EditorModule,
    DocumentModule,
  ],
  controllers: [],
  providers: [PrismaService, AuthService, EditorGateway, DocumentService],
})
export class AppModule {}
