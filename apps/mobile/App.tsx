import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AppRegistry } from 'react-native';
import 'react-native-url-polyfill/auto';
import RootStackNavigator from './src/navigation/RootStackNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStackNavigator />
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