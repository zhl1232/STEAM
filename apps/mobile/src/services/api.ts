// apps/mobile/src/services/api.ts

import { API_BASE_URL } from '@steam/shared/constants'; // 引入我们之前定义的后端基础URL
import { Course, User, CreateUserRequest, ApiResponse } from '@steam/types'; // 引入共享的类型

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

// ===== 用户相关 API =====

// 用户注册
export const registerUser = (userData: CreateUserRequest): Promise<ApiResponse<User>> => {
    return request('/users', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
};

// 检查用户名是否可用
export const checkUsernameAvailability = (username: string): Promise<ApiResponse<{ available: boolean }>> => {
    return request(`/users/username/${encodeURIComponent(username)}`);
};

// 检查邮箱是否可用
export const checkEmailAvailability = (email: string): Promise<ApiResponse<{ available: boolean }>> => {
    return request(`/users/email/${encodeURIComponent(email)}`);
};

// 获取用户信息
export const getUserById = (id: string): Promise<ApiResponse<User>> => {
    return request(`/users/${id}`);
};

// 更新用户信息
export const updateUser = (id: string, userData: Partial<User>): Promise<ApiResponse<User>> => {
    return request(`/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(userData),
    });
};

// ===== 课程相关 API =====

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

// ===== 社区帖子相关 API =====

// 帖子数据类型定义
export interface Post {
    id: string;
    title: string;
    content: string;
    author: {
        id: string;
        name: string;
        avatar: string;
        level: string;
        badge?: string;
    };
    images?: string[];
    category: string;
    categoryColor: string;
    createdAt: string;
    likes: number;
    comments: number;
    views: number;
}

export interface Comment {
    id: string;
    author: {
        name: string;
        avatar: string;
        level: string;
        badge?: string;
    };
    content: string;
    createdAt: string;
    likes: number;
}

// 获取帖子详情
export const getPostById = (id: string): Promise<ApiResponse<Post>> => {
    return request(`/posts/${id}`);
};

// 获取帖子评论
export const getPostComments = (postId: string): Promise<ApiResponse<Comment[]>> => {
    return request(`/posts/${postId}/comments`);
};

// 点赞帖子
export const likePost = (postId: string): Promise<ApiResponse<{ liked: boolean }>> => {
    return request(`/posts/${postId}/like`, {
        method: 'POST',
    });
};

// 添加评论
export const addComment = (postId: string, content: string): Promise<ApiResponse<Comment>> => {
    return request(`/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content }),
    });
};