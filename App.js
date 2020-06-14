/**
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { PersistGate } from 'redux-persist/integration/react';

import Home from './src/component/home';
import Recipe from './src/component/recipe';
import UpdateRecipe from './src/component/updateRecipe';
import persist from './src/store';

const Stack = createStackNavigator();
const persistStore = persist();

export default function App() {
  return (
    <Provider store={persistStore.store}>
      <PersistGate loading={null} persistor={persistStore.persistor}>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Recipe" component={Recipe} />
            <Stack.Screen name="UpdateRecipe" component={UpdateRecipe} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
