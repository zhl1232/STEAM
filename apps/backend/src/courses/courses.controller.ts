// apps/backend/src/courses/courses.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses') // 这个控制器处理所有 /courses 路径的请求
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Post() // 处理 POST /courses 请求
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get() // 处理 GET /courses 请求
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id') // 处理 GET /courses/:id 请求
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id') // 处理 PATCH /courses/:id 请求
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id') // 处理 DELETE /courses/:id 请求
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}