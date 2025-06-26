import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Platform, // Added for platform-specific styling
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'; // Added for icons
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
    iconName: keyof typeof Ionicons.glyphMap, // Added for icon name
    options?: {
      secureTextEntry?: boolean;
      keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'url';
      multiline?: boolean;
      togglePassword?: () => void;
      showPasswordButton?: boolean;
    }
  ) => (
    <View style={styles.inputContainer}>
      <View style={[styles.inputWrapper, errors[field] && styles.inputErrorBorder]}>
        <Ionicons name={iconName} size={20} color="#667eea" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
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
            <Ionicons name={options.secureTextEntry ? "eye-off-outline" : "eye-outline"} size={22} color="#667eea" />
          </TouchableOpacity>
        )}
      </View>
      {errors[field] && (
        <Text style={styles.errorText}>{errors[field]}</Text>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
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
        
        {renderInput('username', '用户名 *', 'person-outline')}
        {renderInput('nickname', '昵称 *', 'happy-outline')}
        {renderInput('email', '邮箱地址 *', 'mail-outline', { keyboardType: 'email-address' })}
        {renderInput('phone_number', '手机号（可选）', 'call-outline', { keyboardType: 'phone-pad' })}

        {/* 密码设置 */}
        <Text style={styles.sectionTitle}>密码设置</Text>
        
        {renderInput('password', '密码 *', 'lock-closed-outline', {
          secureTextEntry: !showPassword,
          showPasswordButton: true,
          togglePassword: () => setShowPassword(!showPassword)
        })}
        
        {renderInput('confirmPassword', '确认密码 *', 'lock-closed-outline', {
          secureTextEntry: !showConfirmPassword,
          showPasswordButton: true,
          togglePassword: () => setShowConfirmPassword(!showConfirmPassword)
        })}

        {/* 用户角色 */}
        <Text style={styles.sectionTitle}>用户类型</Text>
        <View style={styles.inputContainer}>
          <View style={[styles.inputWrapper, styles.pickerInputWrapper, errors.role && styles.inputErrorBorder]}>
            <Ionicons name="briefcase-outline" size={20} color="#667eea" style={styles.inputIcon} />
            <Picker
              selectedValue={formData.role}
              onValueChange={(value: UserRole) => updateField('role', value)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="我是学生" value={UserRole.STUDENT} />
              <Picker.Item label="我是教师" value={UserRole.TEACHER} />
            </Picker>
          </View>
          {errors.role && (
            <Text style={styles.errorText}>{errors.role}</Text>
          )}
        </View>

        {/* 可选信息 */}
        <Text style={[styles.sectionTitle, styles.optionalSectionTitle]}>可选信息</Text>
        <Text style={styles.optionalSectionSubtitle}>完善资料有助于我们更好地为您服务，您也可以稍后在个人资料页面编辑。</Text>
        
        {renderInput('avatar_url', '头像链接（可选）', 'image-outline', { keyboardType: 'url' })}
        {renderInput('bio', '个人简介（可选）', 'create-outline', { multiline: true })}

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
    paddingHorizontal: 30,
    paddingVertical: 40,
    paddingTop: Platform.OS === 'android' ? 50 : 70, // Adjust for status bar
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 32, // Increased font size
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
    paddingHorizontal: 5, // Added padding for section title
  },
  optionalSectionTitle: {
    color: '#555', // Slightly less prominent color
    fontWeight: '500',
  },
  optionalSectionSubtitle: {
    fontSize: 13,
    color: '#777',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  inputContainer: {
    marginBottom: 18, // Increased margin
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50, // Explicit height
    paddingVertical: 10, // Adjusted padding
    fontSize: 16,
    color: '#333',
  },
  inputErrorBorder: { // Renamed from inputError for clarity
    borderColor: '#ff6b6b',
  },
  passwordToggle: {
    padding: 5, // Added padding for easier touch
  },
  // Removed passwordToggleText as we are using an icon now
  pickerInputWrapper: { // Specific wrapper for picker to avoid double padding
    paddingHorizontal: 0,
  },
  pickerContainer: { // Kept for potential future use, but not directly styling the visible border now
    backgroundColor: 'white',
    borderRadius: 12,
  },
  picker: {
    flex: 1, // Ensure picker takes full width within wrapper
    height: 50,
    color: '#333', // Picker text color
  },
  pickerItem: {
    // fontSize: 16, // Style for individual picker items if needed
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 13, // Slightly increased font size
    marginTop: 5,
    marginLeft: 5,
  },
  submitButton: {
    marginTop: 25, // Adjusted margin
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3, // Added shadow for Android
    shadowColor: '#000', // Added shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submitButtonDisabled: {
    opacity: 0.6, // Adjusted opacity
  },
  submitButtonGradient: {
    paddingVertical: 16, // Adjusted padding
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center', // Center text
    flexDirection: 'row', // For icon if added later
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold', // Bolder text
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 25, // Adjusted margin
    marginBottom: 40, // Increased bottom margin
  },
  loginLinkText: {
    fontSize: 16,
    color: '#555', // Darker text for better contrast
  },
  loginLinkHighlight: {
    color: '#667eea',
    fontWeight: 'bold', // Bolder text
  },
});

export default RegisterForm; 