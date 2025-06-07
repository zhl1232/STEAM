/**
 * 工具函数集合
 */

import type { ApiResponse } from '@steam/types';

/**
 * 通用工具函数
 */
export const formatDate = (date: Date, locale = 'zh-CN'): string => {
  return new Intl.DateTimeFormat(locale).format(date);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * 创建 API 响应
 */
export const createApiResponse = <T>(
  data: T,
  success: boolean = true,
  message?: string
): ApiResponse<T> => {
  return {
    success,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}; 