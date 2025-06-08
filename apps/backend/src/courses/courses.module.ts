// apps/backend/src/courses/courses.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from './entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course])], // This line is essential
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule { }