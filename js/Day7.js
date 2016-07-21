import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {screenWidth, screenHeight} from './dimensions'
import Icon from 'react-native-vector-icons/Ionicons';

export default class Day7 extends Component {
  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  render() {
    return (
      <Image
        style={styles.container}
        resizeMode="cover"
        source={require('./assets/agrass.png')}>
        <Icon name="ios-baseball" size={100} color="white" />
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center'
  },
})
