import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CourseScreen from '../screens/CourseScreen';
import ActivityScreen from '../screens/ActivityScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { theme } from '../utils/theme';
const Tab = createBottomTabNavigator();
function getTabBarIcon(routeName) {
    return ({ focused, color, size }) => {
        let iconName;
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
        return <Ionicons name={iconName} size={size} color={color}/>;
    };
}
const BottomTabNavigator = () => {
    return (<Tab.Navigator screenOptions={({ route }) => ({
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
        })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: '探索' }}/>
      <Tab.Screen name="Course" component={CourseScreen} options={{ tabBarLabel: '课程' }}/>
      <Tab.Screen name="Activity" component={ActivityScreen} options={{ tabBarLabel: '活动' }}/>
      <Tab.Screen name="Community" component={CommunityScreen} options={{ tabBarLabel: '社区' }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: '我的' }}/>
    </Tab.Navigator>);
};
export default BottomTabNavigator;
