import React from 'react';
import { Course } from '../types';
interface CourseCardProps {
    course: Course;
    onPress?: () => void;
}
export declare const CourseCard: React.FC<CourseCardProps>;
export {};
