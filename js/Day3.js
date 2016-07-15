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

const twitterBlue = "#1DA1F2";
const twitterGray = "#8899A6";

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
    selectedTab: 'home'
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor={twitterGray}
        tintColor={twitterBlue}
        barTintColor="white">
        <Icon.TabBarItem
          title="Home"
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
          }}>
          <Content backgroundColor="#414A8C" text="Home" />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Notification"
          iconName="ios-notifications-outline"
          selectedIconName="ios-notifications"
          badge={this.state.notifCount}
          selected={this.state.selectedTab === 'notifications'}
          onPress={() => {
            this.setState({
              selectedTab: 'notifications',
            });
          }}>
          <Content backgroundColor="#783E33" text="Notifications" />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Messages"
          iconName="ios-mail-outline"
          selectedIconName="ios-mail"
          selected={this.state.selectedTab === 'messages'}
          onPress={() => {
            this.setState({
              selectedTab: 'messages',
            });
          }}>
          <Content backgroundColor="#414A8C" text="Messages" />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Me"
          iconName="ios-person-outline"
          selectedIconName="ios-person"
          selected={this.state.selectedTab === 'me'}
          onPress={() => {
            this.setState({
              selectedTab: 'me',
            });
          }}>
          <Content backgroundColor="#414A8C" text="Me" />
        </Icon.TabBarItem>
      </TabBarIOS>
    )
  }
}
