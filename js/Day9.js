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
  SegmentedControlIOS,
  NativeModules
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {screenWidth, screenHeight} from './dimensions';

const twitterBlue = "#1DA1F2";
const twitterBrandColor = "#3BA2F3";
const twitterGray = "#8899A6";

const HEADER_MAX_HEIGHT = 125;
const HEADER_MIN_HEIGHT = 64;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const INITIAL_SCROLLY = -HEADER_MAX_HEIGHT;
const START_BLUR = 100 + INITIAL_SCROLLY;
const FINISH_BLUR = 132 + INITIAL_SCROLLY;

// TODO: avatar
// TODO: indicator inset
// TODO: sticky segment

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

class TwitterFlow extends Component {
  state = {
    scrollY: new Animated.Value(0)
  }

  onScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    console.log('offsetY', offsetY)
  }

  render() {
    console.log(this.state.scrollY)
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [INITIAL_SCROLLY, INITIAL_SCROLLY + HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolateRight: 'clamp',
    });

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [INITIAL_SCROLLY, INITIAL_SCROLLY + HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageBlur = this.state.scrollY.interpolate({
      inputRange: [INITIAL_SCROLLY-30, INITIAL_SCROLLY, START_BLUR, FINISH_BLUR],
      outputRange: [1, 0, 0, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.twitterFlow}>
        <Animated.View
          style={[styles.header, {height: headerHeight}]}>
          <Animated.Image
            style={[styles.bg, {height: headerHeight}]}
            resizeMode="cover"
            source={require('./assets/day9/background.png')}>
          </Animated.Image>
          <Animated.Image
            style={[styles.bg, {opacity: imageBlur, height: headerHeight}]}
            resizeMode="cover"
            source={require('./assets/day9/backgroundBlur.png')}>
          </Animated.Image>
          <TopBar />
        </Animated.View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
          contentOffset={{y: -125}}
          contentInset={{top: 125, bottom: 50}}
          style={styles.twitterPost}>
          <Image
            style={styles.profile}
            source={require('./assets/day9/profile.png')} />
          <View
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderBottomColor: '#059FF5',
              borderBottomWidth: StyleSheet.hairlineWidth,
              backgroundColor: 'white'
            }}>
            <SegmentedControlIOS
              values={['Tweets', 'Media', 'Likes']}
              selectedIndex={0}
              tintColor="#059FF5"
              onChange={() => {}}
            />
          </View>
          <Image source={require('./assets/day9/flow.png')} />
        </ScrollView>
      </View>
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
  },
  topBar: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    height: 44,
    flexDirection: 'row',
  },
  nav: {
    flex:1,
    alignItems:"center",
    flexDirection:"row"
  },
  navLeft: {
    justifyContent:"flex-start",
  },
  navRight: {
    justifyContent:"flex-end",
  },
  icon: {
    height: 38,
    width: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  bg: {
    width: screenWidth,
    height: 125,
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1
  },
  profile: {
  },
});
