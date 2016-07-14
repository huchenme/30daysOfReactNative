import React, { Component } from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TabBarIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// TODO: tab bar
// TODO: top bar
// TODO: pull to refresh
// TODO: down arrow
// TODO: animation

const Content = ({backgroundColor, text}) => (
  <View
    style={{
      backgroundColor,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
    <Text
      style={{
        color: 'white',
        fontSize: 20
      }}>
      {text}
    </Text>
  </View>
)

export default class Day3 extends Component {
  state = {
    notifCount: 1,
    selectedTab: 'blueTab'
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor={colors.textSecondary}
        tintColor={colors.blue}
        translucent
        barTintColor="white">
        <Icon.TabBarItem
          title="Home"
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          <Content backgroundColor="#414A8C" text="Blue Tab" />
        </Icon.TabBarItem>
        <TabBarIOS.Item
          title="Red Tab"
          systemIcon="history"
          badge={this.state.notifCount}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          <Content backgroundColor="#783E33" text="Red Tab" />
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}
