import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Index from './src/index';
import Home from './src/Home';
import Task from './src/Task';
import Profile from './src/Profile';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen name="Login" component={Index} />
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="Task" component={Task} />
    </MainStack.Navigator>
  );
};
const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        mode="modal"
        screenOptions={{
          cardStyle: {backgroundColor: 'transparent'},
        }}
        headerMode="none">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen name="Profile" component={Profile} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default RootStackScreen;
