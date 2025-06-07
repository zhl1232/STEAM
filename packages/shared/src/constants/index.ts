/**
 * 项目常量定义
 */

export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000',
  TIMEOUT: 10000,
  RETRY_TIMES: 3,
} as const;

export const APP_CONFIG = {
  NAME: 'STEAM',
  VERSION: '1.0.0',
  DESCRIPTION: 'STEAM Learning Platform',
} as const;

export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_PREFERENCES: 'user_preferences',
  APP_SETTINGS: 'app_settings',
} as const; 