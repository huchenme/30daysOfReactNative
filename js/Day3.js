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
  Easing
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const twitterBlue = "#1DA1F2";
const twitterBrandColor = "#3BA2F3";
const twitterGray = "#8899A6";

// TODO: pull to refresh down arrow

class Entrance extends Component {
  static PropTypes = {
    hideEntrance: PropTypes.func.isRequired
  }

  state = {
    scaleAnim: new Animated.Value(1),
    opacityAnim: new Animated.Value(1),
  }

  componentDidMount() {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(
          this.state.scaleAnim,
          {
            toValue: 0.9,
            duration: 200,
            delay: 2000,
            easing: Easing.out(Easing.ease),
          }
        ),
        Animated.timing(
          this.state.scaleAnim,
          {
            toValue: 50,
            duration: 700,
            delay: 100,
            easing: Easing.in(Easing.ease),
          }
        ),
      ]),
      Animated.timing(
        this.state.opacityAnim,
        {
          toValue: 0,
          duration: 700,
          easing: Easing.in(Easing.ease),
          delay:2300,
        },
      )
    ]).start();

    setTimeout(() => {
      this.props.hideEntrance();
    }, 3000);
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.entrance,
          {
            opacity: this.state.opacityAnim,
          }
        ]}
      >
        <AnimatedIcon
          name="logo-twitter"
          size={70}
          color="white"
          style={{
            transform: [
              {
                scale: this.state.scaleAnim
              }
            ]
          }} />
      </Animated.View>
    )
  }
}

const TwitterIcon = ({name, size = 28, style = {}}) => (
  <View style={[styles.icon, style]}>
    <Icon name={name} size={size} color={twitterBlue} />
  </View>
)

const TopBar = () => (
  <View style={styles.topBar}>
    <View style={[styles.nav, styles.navLeft]}>
      <TwitterIcon name="ios-person-add" size={30} style={{marginLeft: 6}} />
    </View>
    <View style={[styles.nav, styles.navMid]}>
      <TwitterIcon name="logo-twitter" />
    </View>
    <View style={[styles.nav, styles.navRight]}>
      <TwitterIcon name="ios-search-outline" />
      <TwitterIcon name="ios-create-outline" style={{marginRight: 6}} />
    </View>
  </View>
)

class TwitterPost extends Component {
  state = {
    isRefreshing: false,
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
      });
    }, 1000);
  }

  render() {
    return (
      <ScrollView
        style={styles.twitterPost}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={()=>this._onRefresh()}
            tintColor="#ddd"
          />
        }>
        <Image source={require('./assets/day3.png')} />
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

export default class Day3 extends Component {
  state = {
    hideEntrance: true
  }

  hideEntrance = () => {
    this.setState({
      hideEntrance: true
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TwitterTabs />
        {!this.state.hideEntrance && (
          <Entrance hideEntrance={this.hideEntrance} />
        )}
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
    backgroundColor: 'white',
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
    marginTop: -20
  },
  entrance: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: twitterBrandColor,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
