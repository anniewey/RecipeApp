/**
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Home from './src/component/home';
import Recipe from './src/component/recipe';
import UpdateRecipe from './src/component/updateRecipe';
import store from './src/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Recipe" component={Recipe} />
          <Stack.Screen name="UpdateRecipe" component={UpdateRecipe} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
