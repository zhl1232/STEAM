// apps/backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { Course } from './courses/entities/course.entity'; // 1. 在文件顶部导入 Course 实体

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        synchronize: true,
        // autoLoadEntities: true, // 2. 移除或注释掉此行
        entities: [Course],       // 3. 替换为此行，明确注册实体
      }),
    }),

    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }