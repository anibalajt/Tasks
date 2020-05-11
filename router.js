import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Index from './src/index';
import Home from './src/Home';
import Task from './src/Task';

const Root = createStackNavigator();

const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <Root.Navigator headerMode="none">
        <Root.Screen name="Login" component={Index} />
        <Root.Screen name="Home" component={Home} />
        <Root.Screen name="Task" component={Task} />
      </Root.Navigator>
    </NavigationContainer>
  );
};
export default RootStackScreen;
