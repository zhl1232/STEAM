// apps/backend/src/courses/courses.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  // 1. 通过依赖注入，获取 Course 实体的 Repository
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) { }

  // 2. 创建课程的方法
  create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.coursesRepository.create(createCourseDto);
    return this.coursesRepository.save(course);
  }

  // 3. 查找所有课程的方法
  findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  // 4. 根据 ID 查找单个课程的方法
  async findOne(id: string): Promise<Course> {
    const course = await this.coursesRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course with ID "${id}" not found`);
    }
    return course;
  }

  // 5. 根据 ID 更新课程的方法
  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.coursesRepository.preload({
      id: id,
      ...updateCourseDto,
    });
    if (!course) {
      throw new NotFoundException(`Course with ID "${id}" not found`);
    }
    return this.coursesRepository.save(course);
  }

  // 6. 根据 ID 删除课程的方法
  async remove(id: string): Promise<void> {
    const course = await this.findOne(id);
    await this.coursesRepository.remove(course);
  }
}