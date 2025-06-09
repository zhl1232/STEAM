import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RegisterForm from '../components/RegisterForm';
import { User } from '@steam/types';

interface RegisterScreenProps {
  navigation: any; // 从导航库传入的导航对象
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  // 处理注册成功后的逻辑
  const handleRegisterSuccess = (user: User) => {
    console.log('用户注册成功:', user);
    
    // 可以在这里执行额外的逻辑，比如：
    // 1. 保存用户信息到本地存储
    // 2. 设置认证状态
    // 3. 导航到主页面或欢迎页面
    
    // 导航到主页面
    navigation.navigate('MainTabs');
  };

  // 处理导航到登录页面
  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <RegisterForm 
        onRegisterSuccess={handleRegisterSuccess}
        onNavigateToLogin={handleNavigateToLogin}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});

export default RegisterScreen; 