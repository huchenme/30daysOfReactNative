import React, { Component, PropTypes } from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TabBarIOS,
  ScrollView,
  RefreshControl,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {screenWidth} from './dimensions';

const twitterBlue = "#1DA1F2";
const twitterBrandColor = "#3BA2F3";
const twitterGray = "#8899A6";

// TODO: pull to blur

const TwitterIcon = ({name, size = 24, style = {}}) => (
  <View style={[styles.icon, style]}>
    <Icon name={name} size={size} color="white" />
  </View>
)

const TopBar = () => (
  <View style={styles.topBar}>
    <View style={[styles.nav, styles.navLeft]}>
      <TwitterIcon name="ios-arrow-back" style={{marginLeft: 6}} />
    </View>
    <View style={[styles.nav, styles.navRight]}>
      <TwitterIcon name="md-search" />
      <TwitterIcon name="md-create" style={{marginRight: 6}} />
    </View>
  </View>
)

class TwitterPost extends Component {
  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={styles.twitterPost}>
        <Image source={require('./assets/day9/flow.png')} />
      </ScrollView>
    )
  }
}

const TwitterFlow = () => (
  <View style={styles.twitterFlow}>
    <TopBar />
    <TwitterPost />
  </View>
)

class TwitterTabs extends Component {
  state = {
    notifCount: 1,
    selectedTab: 'home'
  }

  selectTab = (tab) => {
    this.setState({
      selectedTab: tab,
    });
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
          onPress={this.selectTab.bind(this, 'home')}>
          <TwitterFlow />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Notification"
          iconName="ios-notifications-outline"
          selectedIconName="ios-notifications"
          badge={this.state.notifCount}
          selected={this.state.selectedTab === 'notifications'}
          onPress={this.selectTab.bind(this, 'notifications')}>
          <TwitterFlow />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Messages"
          iconName="ios-mail-outline"
          selectedIconName="ios-mail"
          selected={this.state.selectedTab === 'messages'}
          onPress={this.selectTab.bind(this, 'messages')}>
          <TwitterFlow />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Me"
          iconName="ios-person-outline"
          selectedIconName="ios-person"
          selected={this.state.selectedTab === 'me'}
          onPress={this.selectTab.bind(this, 'me')}>
          <TwitterFlow />
        </Icon.TabBarItem>
      </TabBarIOS>
    )
  }
}

export default class Day9 extends Component {
  componentWillMount() {
    StatusBar.setBarStyle('light-content');
  }

  render() {
    return (
      <View style={styles.container}>
        <TwitterTabs />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  twitterFlow: {
    flex: 1,
    backgroundColor: '#F5F8FA',
  },
  topBar: {
    height: 64,
    borderBottomColor: '#C8CFD6',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    paddingTop: 20,
    backgroundColor: '#777',
    zIndex: 1
  },
  nav: {
    flex:1,
    alignItems:"center",
    flexDirection:"row"
  },
  navLeft: {
    justifyContent:"flex-start",
  },
  navMid: {
    justifyContent:"center",
  },
  navRight: {
    justifyContent:"flex-end",
  },
  icon: {
    height: 38,
    width: 38,
    alignItems: 'center',
    justifyContent: 'center'
  },
  twitterPost: {
    flex: 1,
  },
});
