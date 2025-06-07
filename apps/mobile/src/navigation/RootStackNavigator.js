import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import ArtScreen from '../screens/explore/ArtScreen';
import TechnologyScreen from '../screens/explore/TechnologyScreen';
import EngineeringScreen from '../screens/explore/EngineeringScreen';
import MathematicsScreen from '../screens/explore/MathematicsScreen';
import ScienceScreen from '../screens/explore/ScienceScreen';
const Stack = createStackNavigator();
const RootStackNavigator = () => {
    return (<Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
      {/* 底部Tab导航器作为主页面 */}
      <Stack.Screen name="MainTabs" component={BottomTabNavigator}/>
      
      {/* Explore页面 */}
      <Stack.Screen name="Science" component={ScienceScreen} options={{
            headerShown: false,
            presentation: 'card',
        }}/>
      <Stack.Screen name="Technology" component={TechnologyScreen} options={{
            headerShown: false,
            presentation: 'card',
        }}/>
      <Stack.Screen name="Engineering" component={EngineeringScreen} options={{
            headerShown: false,
            presentation: 'card',
        }}/>
      <Stack.Screen name="Art" component={ArtScreen} options={{
            headerShown: false,
            presentation: 'card',
        }}/>
      <Stack.Screen name="Mathematics" component={MathematicsScreen} options={{
            headerShown: false,
            presentation: 'card',
        }}/>
    </Stack.Navigator>);
};
export default RootStackNavigator;
