import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { 
  RegisterFormData, 
  FormValidationErrors, 
  UserRole, 
  CreateUserRequest 
} from '@steam/types';
import { validateRegisterForm, hasValidationErrors } from '../utils/validation';
import { registerUser } from '../services/api';

interface RegisterFormProps {
  onRegisterSuccess: (user: any) => void;
  onNavigateToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess, onNavigateToLogin }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone_number: '',
    avatar_url: '',
    nickname: '',
    role: UserRole.STUDENT,
    bio: '',
  });

  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 更新表单数据
  const updateField = (field: keyof RegisterFormData, value: string | UserRole) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 清除该字段的错误
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // 处理表单提交
  const handleSubmit = async () => {
    // 验证表单
    const validationErrors = validateRegisterForm(formData);
    setErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      Alert.alert('验证失败', '请检查输入信息并修正错误');
      return;
    }

    setIsLoading(true);

    try {
      // 准备API请求数据
      const requestData: CreateUserRequest = {
        username: formData.username.trim(),
        password: formData.password,
        email: formData.email.trim(),
        phone_number: formData.phone_number?.trim() || undefined,
        avatar_url: formData.avatar_url?.trim() || undefined,
        nickname: formData.nickname.trim(),
        role: formData.role,
        bio: formData.bio?.trim() || undefined,
      };

      const response = await registerUser(requestData);

      if (response.success && response.data) {
        Alert.alert(
          '注册成功',
          '欢迎加入STEAM学习平台！',
          [
            {
              text: '确定',
              onPress: () => onRegisterSuccess(response.data)
            }
          ]
        );
      } else {
        Alert.alert('注册失败', response.message || '注册过程中发生未知错误');
      }
    } catch (error: any) {
      console.error('注册失败:', error);
      Alert.alert(
        '注册失败',
        error.message || '网络连接失败，请检查您的网络设置'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (
    field: keyof RegisterFormData,
    placeholder: string,
    options?: {
      secureTextEntry?: boolean;
      keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'url';
      multiline?: boolean;
      togglePassword?: () => void;
      showPasswordButton?: boolean;
    }
  ) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, errors[field] && styles.inputError]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={formData[field] as string}
        onChangeText={(text) => updateField(field, text)}
        secureTextEntry={options?.secureTextEntry}
        keyboardType={options?.keyboardType || 'default'}
        multiline={options?.multiline}
        numberOfLines={options?.multiline ? 3 : 1}
      />
      {options?.showPasswordButton && (
        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={options.togglePassword}
        >
          <Text style={styles.passwordToggleText}>
            {options.secureTextEntry ? '显示' : '隐藏'}
          </Text>
        </TouchableOpacity>
      )}
      {errors[field] && (
        <Text style={styles.errorText}>{errors[field]}</Text>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.title}>注册 STEAM 账户</Text>
        <Text style={styles.subtitle}>开启你的学习之旅</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        {/* 基本信息 */}
        <Text style={styles.sectionTitle}>基本信息</Text>
        
        {renderInput('username', '用户名 *')}
        {renderInput('nickname', '昵称 *')}
        {renderInput('email', '邮箱地址 *', { keyboardType: 'email-address' })}
        {renderInput('phone_number', '手机号（可选）', { keyboardType: 'phone-pad' })}

        {/* 密码设置 */}
        <Text style={styles.sectionTitle}>密码设置</Text>
        
        {renderInput('password', '密码 *', {
          secureTextEntry: !showPassword,
          showPasswordButton: true,
          togglePassword: () => setShowPassword(!showPassword)
        })}
        
        {renderInput('confirmPassword', '确认密码 *', {
          secureTextEntry: !showConfirmPassword,
          showPasswordButton: true,
          togglePassword: () => setShowConfirmPassword(!showConfirmPassword)
        })}

        {/* 用户角色 */}
        <Text style={styles.sectionTitle}>用户类型</Text>
        <View style={styles.inputContainer}>
          <View style={[styles.pickerContainer, errors.role && styles.inputError]}>
            <Picker
              selectedValue={formData.role}
              onValueChange={(value: UserRole) => updateField('role', value)}
              style={styles.picker}
            >
              <Picker.Item label="学生" value={UserRole.STUDENT} />
              <Picker.Item label="教师" value={UserRole.TEACHER} />
            </Picker>
          </View>
          {errors.role && (
            <Text style={styles.errorText}>{errors.role}</Text>
          )}
        </View>

        {/* 可选信息 */}
        <Text style={styles.sectionTitle}>可选信息</Text>
        
        {renderInput('avatar_url', '头像URL（可选）', { keyboardType: 'url' })}
        {renderInput('bio', '个人简介（可选）', { multiline: true })}

        {/* 注册按钮 */}
        <TouchableOpacity
          style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <LinearGradient
            colors={isLoading ? ['#ccc', '#999'] : ['#667eea', '#764ba2']}
            style={styles.submitButtonGradient}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? '注册中...' : '立即注册'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* 登录链接 */}
        <TouchableOpacity style={styles.loginLink} onPress={onNavigateToLogin}>
          <Text style={styles.loginLinkText}>
            已有账户？ <Text style={styles.loginLinkHighlight}>立即登录</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    color: '#333',
  },
  inputError: {
    borderColor: '#ff6b6b',
  },
  passwordToggle: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  passwordToggleText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '500',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  picker: {
    height: 50,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  submitButton: {
    marginTop: 30,
    borderRadius: 12,
    overflow: 'hidden',
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonGradient: {
    padding: 18,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  loginLinkText: {
    fontSize: 16,
    color: '#666',
  },
  loginLinkHighlight: {
    color: '#667eea',
    fontWeight: '600',
  },
});

export default RegisterForm; 