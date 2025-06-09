import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import BottomTabNavigator from './BottomTabNavigator';
import RegisterScreen from '../screens/RegisterScreen';
import ArtScreen from '../screens/explore/ArtScreen';
import TechnologyScreen from '../screens/explore/TechnologyScreen';
import EngineeringScreen from '../screens/explore/EngineeringScreen';
import MathematicsScreen from '../screens/explore/MathematicsScreen';
import ScienceScreen from '../screens/explore/ScienceScreen';
import PostDetailScreen from '../screens/community/PostDetailScreen';
import { theme } from '../utils/theme';

const Stack = createStackNavigator();

// 简单的登录屏幕组件
const LoginScreen = ({ navigation }: any) => {
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginTitle}>登录页面</Text>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>没有账户？去注册</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate('MainTabs')}
      >
        <Text style={styles.buttonText}>暂时跳过</Text>
      </TouchableOpacity>
    </View>
  );
};

const RootStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* 认证相关屏幕 */}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ title: '登录' }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ 
          title: '注册',
          headerShown: false
        }}
      />
      
      {/* 底部Tab导航器作为主页面 */}
      <Stack.Screen 
        name="MainTabs" 
        component={BottomTabNavigator} 
      />
      
      {/* Explore页面 */}
      <Stack.Screen 
        name="Science" 
        component={ScienceScreen}
        options={{ 
          headerShown: false,
          presentation: 'card',
        }}
      />
      <Stack.Screen 
        name="Technology" 
        component={TechnologyScreen}
        options={{ 
          headerShown: false,
          presentation: 'card',
        }}
      />
      <Stack.Screen 
        name="Engineering" 
        component={EngineeringScreen}
        options={{ 
          headerShown: false,
          presentation: 'card',
        }}
      />
      <Stack.Screen 
        name="Art" 
        component={ArtScreen}
        options={{ 
          headerShown: false,
          presentation: 'card',
        }}
      />
      <Stack.Screen 
        name="Mathematics" 
        component={MathematicsScreen}
        options={{ 
          headerShown: false,
          presentation: 'card',
        }}
      />
      
      {/* 社区详情页 */}
      <Stack.Screen 
        name="PostDetail" 
        component={PostDetailScreen}
        options={{ 
          headerShown: false,
          presentation: 'card',
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 30,
  },
  registerButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  skipButton: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'medium',
  },
});

export default RootStackNavigator; 