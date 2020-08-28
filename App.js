import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import allReducers from './redux/reducers/index.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Home from './screens/home/index';
import Watch from './screens/watch/index';

const store = createStore(allReducers);

const Stack = createStackNavigator();

const config = {
  animation: 'timing',
  config: {
   duration:.1,
  },
};

const transitionSpec = { 
  open: config, 
  close: config, 
};

const options = {
  header:()=> null, transitionSpec 
};

export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home" component={Home} options={options}/>
          <Stack.Screen name="watch" component={Watch} options={options} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}