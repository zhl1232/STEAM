/**
 * 项目常量定义
 */
export const API_BASE_URL = 'https://steam-ngg5.onrender.com';

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
