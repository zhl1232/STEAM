import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AppRegistry } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import CourseScreen from './src/screens/CourseScreen';
import ActivityScreen from './src/screens/ActivityScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ArtScreen from './src/screens/ArtScreen';
import EngineeringScreen from './src/screens/EngineeringScreen';
// import ScienceScreen from './src/screens/ScienceScreen';
import TechnologyScreen from './src/screens/TechnologyScreen';


import { theme } from './src/utils/theme';

const Tab = createBottomTabNavigator();

function getTabBarIcon(routeName: string) {
  return ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
    let iconName: keyof typeof Ionicons.glyphMap;

    switch (routeName) {
      case 'Home':
        iconName = focused ? 'compass' : 'compass-outline';
        break;
      case 'Course':
        iconName = focused ? 'book' : 'book-outline';
        break;
      case 'Activity':
        iconName = focused ? 'calendar' : 'calendar-outline';
        break;
      case 'Community':
        iconName = focused ? 'people' : 'people-outline';
        break;
      case 'Profile':
        iconName = focused ? 'person' : 'person-outline';
        break;
      default:
        iconName = 'ellipse';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  };
}

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: getTabBarIcon(route.name),
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.textSecondary,
            tabBarStyle: {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderTopWidth: 0,
              elevation: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 10,
              height: 90,
              paddingBottom: 20,
              paddingTop: 10,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
            },
            headerShown: false,
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ tabBarLabel: '探索' }}
          />
          <Tab.Screen 
            name="Course" 
            component={CourseScreen} 
            options={{ tabBarLabel: '课程' }}
          />
          <Tab.Screen 
            name="Activity" 
            component={ActivityScreen} 
            options={{ tabBarLabel: '活动' }}
          />
          <Tab.Screen 
            name="Community" 
            component={CommunityScreen} 
            options={{ tabBarLabel: '社区' }}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ tabBarLabel: '我的' }}
          />
          <Tab.Screen 
            name="Art" 
            component={ArtScreen} 
            options={{ tabBarLabel: '艺术' }}
          />
          <Tab.Screen 
            name="Engineering" 
            component={EngineeringScreen} 
            options={{ tabBarLabel: '工程' }}
          />
          {/* <Tab.Screen 
            name="Science" 
            component={ScienceScreen} 
            options={{ tabBarLabel: '科学' }}
          /> */}
          <Tab.Screen 
            name="Technology" 
            component={TechnologyScreen} 
            options={{ tabBarLabel: '技术' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

// Web平台自动注册
AppRegistry.registerComponent('main', () => App);

// 如果在web环境中，自动启动应用
if (typeof document !== 'undefined') {
  const rootTag = document.getElementById('root');
  if (rootTag) {
    AppRegistry.runApplication('main', {
      rootTag: rootTag
    });
  }
}

export default App; 