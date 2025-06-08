// apps/backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    // 1. 加载环境变量
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局可用
    }),

    // 2. 配置 TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // 从环境变量中获取数据库连接字符串
        url: configService.get('DATABASE_URL'),
        // 在开发环境中，自动根据实体类同步数据库表结构
        // 警告：在生产环境中应设为 false，以防数据丢失
        synchronize: true,
        // 自动加载实体，无需在 forRoot 中手动列出
        autoLoadEntities: true,
      }),
    }),

    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }