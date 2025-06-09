import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    category!: string;

    @IsNumber()
    duration!: number;
}
