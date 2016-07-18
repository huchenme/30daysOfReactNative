import React, { Component, PropTypes } from 'react';
import * as colors from './colors';
import {
  Animated,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';

import {screenWidth} from './dimensions';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/MaterialIcons';

const tabs = [
  {
    icon: "home",
    iconSize: 28,
    title: "Home",
  },
  {
    icon: "whatshot",
    iconSize: 28,
    title: "Trending",
  },
  {
    icon: "subscriptions",
    iconSize: 26,
    title: "Subscriptions",
  },
  {
    icon: "person",
    iconSize: 32,
    title: "Account",
  },
]

// TODO: cam ion show and leave animation

class TabBar extends Component {
  tabIcons = []

  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
  }

  render() {
    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, screenWidth / 4],
    });

    return (
      <View style={styles.nav}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{tabs[this.props.activeTab].title}</Text>
          <View style={styles.icons}>
            <Icon
              name="search"
              size={24}
              color='white'
              style={{marginRight: 24}}
            />
            <Icon
              name="more-vert"
              size={24}
              color='white'
            />
          </View>
        </View>
        <View style={styles.tabs}>
          {this.props.tabs.map((tab, i) => {
            return (
              <TouchableWithoutFeedback
                key={i}
                onPress={() => this.props.goToPage(i)}>
                <View style={styles.tab}>
                  <Icon
                    name={tabs[i].icon}
                    size={tabs[i].iconSize}
                    color={this.props.activeTab === i ? 'white' : '#5C0D09'}
                  />
                </View>
              </TouchableWithoutFeedback>
            );
          })}
          <Animated.View style={[styles.tabUnderlineStyle, { left } ]} />
        </View>
      </View>
    );
  }
}

export default class Day24 extends Component {
  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <ScrollableTabView
          renderTabBar={() => <TabBar />}>
          <ScrollView tabLabel="home" style={styles.tabView}>
            <Image source={require('./assets/day24/screen1.png')} />
          </ScrollView>
          <ScrollView tabLabel="trending" style={styles.tabView}>
            <Image source={require('./assets/day24/screen2.png')} />
          </ScrollView>
          <ScrollView tabLabel="subscriptions" style={styles.tabView}>
            <Image source={require('./assets/day24/screen3.png')} />
          </ScrollView>
          <ScrollView tabLabel="account" style={styles.tabView}>
            <Image source={require('./assets/day24/screen4.png')} />
          </ScrollView>
        </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: '#C41C14',
    height: 20
  },
  tabView: {
    flex: 1
  },
  nav: {
    zIndex: 1,
    backgroundColor: '#E62117',
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 16
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4
  },
  tabs: {
    height: 48,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabUnderlineStyle: {
    position: 'absolute',
    width: screenWidth / 4,
    height: 4,
    backgroundColor: 'white',
    bottom: 0,
  },
})
