import { RegisterFormData, FormValidationErrors } from '@steam/types';

// 验证邮箱格式
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// 验证中国手机号格式
export const isValidChinesePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
};

// 验证URL格式
export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// 验证用户名格式（3-50字符，字母数字下划线）
export const isValidUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,50}$/;
    return usernameRegex.test(username);
};

// 验证密码强度（至少6个字符）
export const isValidPassword = (password: string): boolean => {
    return password.length >= 6 && password.length <= 255;
};

// 主要的表单验证函数
export const validateRegisterForm = (formData: RegisterFormData): FormValidationErrors => {
    const errors: FormValidationErrors = {};

    // 验证用户名
    if (!formData.username.trim()) {
        errors.username = '用户名不能为空';
    } else if (!isValidUsername(formData.username)) {
        errors.username = '用户名必须是3-50个字符，只能包含字母、数字和下划线';
    }

    // 验证密码
    if (!formData.password) {
        errors.password = '密码不能为空';
    } else if (!isValidPassword(formData.password)) {
        errors.password = '密码长度必须在6-255个字符之间';
    }

    // 验证确认密码
    if (!formData.confirmPassword) {
        errors.confirmPassword = '请确认密码';
    } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = '两次输入的密码不一致';
    }

    // 验证邮箱
    if (!formData.email.trim()) {
        errors.email = '邮箱不能为空';
    } else if (!isValidEmail(formData.email)) {
        errors.email = '请输入有效的邮箱地址';
    } else if (formData.email.length > 100) {
        errors.email = '邮箱长度不能超过100个字符';
    }

    // 验证手机号（可选）
    if (formData.phone_number && formData.phone_number.trim()) {
        if (!isValidChinesePhoneNumber(formData.phone_number)) {
            errors.phone_number = '请输入有效的中国手机号';
        } else if (formData.phone_number.length > 20) {
            errors.phone_number = '手机号长度不能超过20个字符';
        }
    }

    // 验证头像URL（可选）
    if (formData.avatar_url && formData.avatar_url.trim()) {
        if (!isValidUrl(formData.avatar_url)) {
            errors.avatar_url = '请输入有效的URL地址';
        } else if (formData.avatar_url.length > 255) {
            errors.avatar_url = 'URL长度不能超过255个字符';
        }
    }

    // 验证昵称
    if (!formData.nickname.trim()) {
        errors.nickname = '昵称不能为空';
    } else if (formData.nickname.length > 50) {
        errors.nickname = '昵称长度不能超过50个字符';
    }

    return errors;
};

// 检查是否有验证错误
export const hasValidationErrors = (errors: FormValidationErrors): boolean => {
    return Object.keys(errors).length > 0;
}; 