/**
 * 共享类型定义
 */

// 用户角色枚举
export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin'
}

// 用户相关类型
export interface User {
  id: string;
  username: string;
  email: string;
  phone_number?: string;
  avatar_url?: string;
  nickname: string;
  role: UserRole;
  bio?: string;
  created_at: Date;
  updated_at: Date;
  last_login_at?: Date;
  is_active: boolean;
}

// 用户注册请求数据类型
export interface CreateUserRequest {
  username: string;
  password: string;
  email: string;
  phone_number?: string;
  avatar_url?: string;
  nickname: string;
  role?: UserRole;
  bio?: string;
}

// 用户注册表单数据类型
export interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone_number?: string;
  avatar_url?: string;
  nickname: string;
  role?: UserRole;
  bio?: string;
}

// 表单验证错误类型
export interface FormValidationErrors {
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  phone_number?: string;
  avatar_url?: string;
  nickname?: string;
  role?: string;
  bio?: string;
}

export interface UserProfile extends User {
  bio?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 课程相关类型
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: User;
  thumbnail?: string;
  duration: number; // 分钟
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string;
  videoUrl?: string;
  duration: number;
  order: number;
  isCompleted?: boolean;
}

// 通用类型
export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
}