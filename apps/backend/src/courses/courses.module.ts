// apps/backend/src/courses/courses.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. 导入 TypeOrmModule
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from './entities/course.entity'; // 2. 导入 Course 实体

@Module({
  // 3. 在 imports 数组中添加 TypeOrmModule.forFeature()
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule { }