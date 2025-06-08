// apps/backend/src/courses/entities/course.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('courses') // 定义数据库中的表名为 'courses'
export class Course {
    @PrimaryGeneratedColumn('uuid') // 主键，使用 UUID 策略
    id!: string;

    @Column() // 普通列
    title!: string;

    @Column({ type: 'text' }) // 指定类型为 text
    description!: string;

    @Column()
    category!: string; // 'Science', 'Technology', 'Art', etc.

    @Column({ type: 'int' })
    duration!: number; // in minutes
}