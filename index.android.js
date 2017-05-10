import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import {TabNavigator} from 'react-navigation';
import MainScreen from './screens/MainScreen';
import LibraryScreen from './screens/LibraryScreen';

class Tunisiatron9000 extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <MainScreen navigation={navigation}/>
    );
  }
}

const SimpleApp = TabNavigator({
  Home: {screen: MainScreen},
  Library: {screen: LibraryScreen},
},
{
  tabBarOptions: {
    activeTintColor: 'white',
    indicatorStyle: {
      backgroundColor: 'white'
    },
    style: {
      backgroundColor: '#372359'
    }
  }
});

AppRegistry.registerComponent('Tunisiatron9000', () => SimpleApp);
