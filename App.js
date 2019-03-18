import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Index from './screens/Index';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const RootStack = createStackNavigator(
  {
    Index: {
      screen: Index,
      navigationOptions: {
        header: null
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: "Login"
      }
    },
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Index',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}