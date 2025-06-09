// apps/mobile/src/screens/auth/ExampleUsage.tsx
// 这是一个使用示例，展示如何在应用中集成注册功能

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../RegisterScreen';

// 示例：创建认证导航栈
const AuthStack = createStackNavigator();

// 示例：主页面组件
const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>欢迎来到 STEAM 学习平台！</Text>
    </View>
  );
};

// 示例：登录屏幕组件
const LoginScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 30 }}>登录页面</Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#667eea',
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
        }}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>没有账户？去注册</Text>
      </TouchableOpacity>
    </View>
  );
};

// 示例：认证导航栈配置
function AuthStackScreen() {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ title: '登录' }}
      />
      <AuthStack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ 
          title: '注册',
          headerShown: false // 注册页面有自己的头部设计
        }}
      />
      <AuthStack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: '首页' }}
      />
    </AuthStack.Navigator>
  );
}

// 示例：应用根组件
export default function ExampleApp() {
  return (
    <NavigationContainer>
      <AuthStackScreen />
    </NavigationContainer>
  );
}

/*
使用方法：

1. 确保安装了必要的依赖：
   - @react-navigation/native
   - @react-navigation/stack
   - react-native-screens
   - react-native-safe-area-context
   - @react-native-picker/picker

2. 在你的主应用文件中导入并使用 RegisterScreen：
   
   import RegisterScreen from './src/screens/RegisterScreen';

3. 在导航配置中添加注册路由：
   
   <Stack.Screen name="Register" component={RegisterScreen} />

4. 从其他屏幕导航到注册页面：
   
   navigation.navigate('Register');

5. 自定义注册成功后的行为：
   在 RegisterScreen 的 handleRegisterSuccess 函数中添加你的逻辑。
*/