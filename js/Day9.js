import React, {Component, PropTypes} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TabBarIOS,
  ScrollView,
  Animated,
  StatusBar,
  SegmentedControlIOS,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {screenWidth} from './dimensions'

const twitterBlue = '#1DA1F2'
const twitterGray = '#8899A6'

const HEADER_MAX_HEIGHT = 125
const HEADER_MIN_HEIGHT = 64
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT
const INITIAL_SCROLLY = -HEADER_MAX_HEIGHT
const START_BLUR = 100 + INITIAL_SCROLLY
const FINISH_BLUR = 132 + INITIAL_SCROLLY

// TODO: indicator inset
// TODO: sticky segment

const TwitterIcon = ({name, size = 24, style = {}}) => (
  <View style={[styles.icon, style]}>
    <Icon name={name} size={size} color='white' />
  </View>
)
TwitterIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  style: PropTypes.object,
}

const TopBar = ({top}) => (
  <View style={styles.topBar}>
    <View style={[styles.nav, styles.navLeft]}>
      <TwitterIcon name='ios-arrow-back' style={{marginLeft: 6}} />
    </View>
    <View style={[styles.nav, styles.navMid]}>
      <Animated.View style={[styles.headTextContainer, {top}]}>
        <Text style={[styles.text, styles.textHead]}>
          Hired
        </Text>
        <Text style={[styles.text, styles.textCount]}>
          2,917 Tweets
        </Text>
      </Animated.View>
    </View>
    <View style={[styles.nav, styles.navRight]}>
      <TwitterIcon name='md-search' />
      <TwitterIcon name='md-create' style={{marginRight: 6}} />
    </View>
  </View>
)
TopBar.propTypes = {
  top: PropTypes.object.isRequired,
}

class TwitterTabs extends Component {
  state = {
    notifCount: 1,
    selectedTab: 'home',
  }

  selectTab = (tab) => {
    this.setState({
      selectedTab: tab,
    })
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor={twitterGray}
        tintColor={twitterBlue}
        barTintColor='white'>
        <Icon.TabBarItem
          title='Home'
          iconName='ios-home-outline'
          selectedIconName='ios-home'
          selected={this.state.selectedTab === 'home'}
          onPress={this.selectTab.bind(this, 'home')}>
          <TwitterFlow />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title='Notification'
          iconName='ios-notifications-outline'
          selectedIconName='ios-notifications'
          badge={this.state.notifCount}
          selected={this.state.selectedTab === 'notifications'}
          onPress={this.selectTab.bind(this, 'notifications')}>
          <TwitterFlow />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title='Messages'
          iconName='ios-mail-outline'
          selectedIconName='ios-mail'
          selected={this.state.selectedTab === 'messages'}
          onPress={this.selectTab.bind(this, 'messages')}>
          <TwitterFlow />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title='Me'
          iconName='ios-person-outline'
          selectedIconName='ios-person'
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
    scrollY: new Animated.Value(0),
    headerZIndex: 0,
  }

  componentDidMount() {
    this.state.scrollY.addListener(({value}) => {
      this.setState({
        headerZIndex: value >= INITIAL_SCROLLY + HEADER_SCROLL_DISTANCE ? 1 : 0,
      })
    })
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [INITIAL_SCROLLY, INITIAL_SCROLLY + HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolateRight: 'clamp',
    })

    const imageBlur = this.state.scrollY.interpolate({
      inputRange: [INITIAL_SCROLLY - 30, INITIAL_SCROLLY, START_BLUR, FINISH_BLUR],
      outputRange: [1, 0, 0, 1],
      extrapolate: 'clamp',
    })

    const avatarScale = this.state.scrollY.interpolate({
      inputRange: [INITIAL_SCROLLY, INITIAL_SCROLLY + HEADER_SCROLL_DISTANCE],
      outputRange: [1, 43 / 68],
      extrapolate: 'clamp',
    })

    const avatarTop = this.state.scrollY.interpolate({
      inputRange: [INITIAL_SCROLLY, INITIAL_SCROLLY + HEADER_SCROLL_DISTANCE],
      outputRange: [-28, -12],
      extrapolate: 'clamp',
    })

    const textTop = this.state.scrollY.interpolate({
      inputRange: [INITIAL_SCROLLY, INITIAL_SCROLLY + 155],
      outputRange: [155, 0],
      extrapolate: 'clamp',
    })

    return (
      <View style={styles.twitterFlow}>
        <Animated.View
          style={[
            styles.header,
            {height: headerHeight},
            {zIndex: this.state.headerZIndex},
          ]}>
          <Animated.Image
            style={[styles.bg, {height: headerHeight}]}
            resizeMode='cover'
            source={require('./assets/day9/background.png')}>
          </Animated.Image>
          <Animated.Image
            style={[styles.bg, {opacity: imageBlur, height: headerHeight}]}
            resizeMode='cover'
            source={require('./assets/day9/backgroundBlur.png')}>
          </Animated.Image>
          <TopBar top={textTop} />
        </Animated.View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
          contentOffset={{y: -HEADER_MAX_HEIGHT}}
          contentInset={{top: HEADER_MAX_HEIGHT, bottom: 50}}
          scrollIndicatorInsets={{top: 359}}
          style={[styles.twitterPost]}>
          <Image
            style={styles.profile}
            source={require('./assets/day9/profile.png')}>
            <Animated.View style={[styles.avatarContainer, {
              top: avatarTop,
              transform: [{
                scale: avatarScale,
              }],
            }]}>
              <Image
                style={styles.avatar}
                resizeMode='contain'
                source={require('./assets/day9/avatar.png')} />
            </Animated.View>
          </Image>
          <View style={styles.segmentedControl}>
            <SegmentedControlIOS
              values={['Tweets', 'Media', 'Likes']}
              selectedIndex={0}
              tintColor='#059FF5'
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
    StatusBar.setBarStyle('light-content')
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
    flex: 1,
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
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  navLeft: {
    justifyContent: 'flex-start',
  },
  navMid: {
    justifyContent: 'center',
  },
  navRight: {
    justifyContent: 'flex-end',
  },
  icon: {
    height: 38,
    width: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  bg: {
    width: screenWidth,
    height: 125,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  profile: {
    overflow: 'visible',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 1,
  },
  textHead: {
    fontWeight: '500',
    fontSize: 14,
  },
  textCount: {
    fontWeight: '400',
    fontSize: 10,
  },
  headTextContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  segmentedControl: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomColor: '#059FF5',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 8,
  },
  avatarContainer: {
    width: 75,
    height: 75,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 8,
  },
})
