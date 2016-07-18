import React, { Component, PropTypes } from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  WebView,
  StatusBar,
  ActionSheetIOS
} from 'react-native';

import WebBrowser from './browser';
import Icon from 'react-native-vector-icons/Ionicons';
import {screenWidth} from './dimensions';

export default class Day19 extends Component {
  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  _showShareActionSheet = () => {
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: this.refs.browser.state.currentUrl,
      message: this.refs.browser.state.status,
    },
    (error) => alert(error),
    (success, method) => {
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <WebBrowser
          ref="browser"
          url="https://github.com/facebook/react-native"
          hideHomeButton={true}
          hideToolbar={false}
          hideAddressBar={false}
          hideStatusBar={true}
          hideActivityIndicator={true}
          foregroundColor={'#555'}
          backgroundColor={'#00ab6b'}
        />
        <TouchableHighlight underlayColor="transparent" onPress={this._showShareActionSheet}>
          <Icon name="ios-share-outline" style={styles.shareIcon} color="#555" size={30}/>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#00ab6b'
  },
  shareIcon: {
    position: 'absolute',
    bottom: 0,
    left: screenWidth / 2 - 15
  }
})
