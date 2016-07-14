import React, { Component } from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TabBarIOS
} from 'react-native';

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
        unselectedTintColor="yellow"
        tintColor="white"
        translucent
        barTintColor="darkslateblue">
        <TabBarIOS.Item
          title="Blue Tab"
          systemIcon="downloads"
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          <Content backgroundColor="#414A8C" text="Blue Tab" />
        </TabBarIOS.Item>
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
