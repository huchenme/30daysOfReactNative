import React, { Component, PropTypes } from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class Day24 extends Component {
  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <ScrollableTabView>
          <ScrollView tabLabel="Home" style={styles.tabView}>
            <Image source={require('./assets/day24/screen1.png')} />
          </ScrollView>
          <ScrollView tabLabel="Trending" style={styles.tabView}>
            <Image source={require('./assets/day24/screen2.png')} />
          </ScrollView>
          <ScrollView tabLabel="Subscriptions" style={styles.tabView}>
            <Image source={require('./assets/day24/screen3.png')} />
          </ScrollView>
          <ScrollView tabLabel="Account" style={styles.tabView}>
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
  }
})
