// apps/mobile/src/services/api.ts

import { API_BASE_URL } from '@steam/shared/constants'; // 引入我们之前定义的后端基础URL
import { Course } from '@steam/types'; // 引入共享的 Course 类型

// 创建一个通用的请求函数
const request = async (endpoint: string, options?: RequestInit) => {
    const url = `${API_BASE_URL}${endpoint}`;
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            ...options,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`API request failed for endpoint: ${endpoint}`, error);
        throw error;
    }
};

// 获取所有课程
export const getCourses = (): Promise<Course[]> => {
    return request('/courses');
};

// 根据 ID 获取单个课程
export const getCourseById = (id: string): Promise<Course> => {
    return request(`/courses/${id}`);
};

// 创建一个新课程
// DTO (Data Transfer Object) 类型可以从 @steam/types 导入，如果需要的话
type CreateCourseDto = Omit<Course, 'id'>;

export const createCourse = (courseData: CreateCourseDto): Promise<Course> => {
    return request('/courses', {
        method: 'POST',
        body: JSON.stringify(courseData),
    });
};

// ... 您可以在这里继续添加 updateCourse, deleteCourse 等方法