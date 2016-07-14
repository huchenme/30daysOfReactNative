import React, { Component, PropTypes } from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';
import Video from 'react-native-video';
import Swiper from 'react-native-swiper';

const Logo = () => (
  <View style={styles.logo}>
    <Image source={require('./assets/spotify.png')} />
  </View>
)

const FullVideo = () => (
  <Video
    source={{uri: 'moments'}}
    style={StyleSheet.absoluteFill}
    resizeMode="cover"
    repeat={true}
    muted />
)

const HintSwiper = () => (
  <Swiper>
    <View style={styles.slide}>
      <Text style={styles.slideTextTitle}>Welcome</Text>
      <Text style={styles.slideText}>Sign up for free music on your phone,tablet</Text>
      <Text style={styles.slideText}>and computer.</Text>
    </View>
    <View style={styles.slide}>
      <Text style={styles.slideTextTitle}>Browse</Text>
      <Text style={styles.slideText}>Explore top tracks, new releases and the right</Text>
      <Text style={styles.slideText}>playlist for every moment</Text>
    </View>
    <View style={styles.slide}>
      <Text style={styles.slideTextTitle}>Search</Text>
      <Text style={styles.slideText}>Looking for that special album or artist? Just</Text>
      <Text style={styles.slideText}>search and hit play!</Text>
    </View>
    <View style={styles.slide}>
      <Text style={styles.slideTextTitle}>Running</Text>
      <Text style={styles.slideText}>Music that perfectly matches</Text>
      <Text style={styles.slideText}>your tempo.</Text>
    </View>
    <View style={styles.slide}>
      <Text style={styles.slideTextTitle}>Your Library</Text>
      <Text style={styles.slideText}>Save any song,album or artist to your own</Text>
      <Text style={styles.slideText}>music collection.</Text>
    </View>
  </Swiper>
)

class Buttons extends Component {
  state = {
    signupButtonColor: '#1DB954'
  }

  onPressIn = () => {
    this.setState({signupButtonColor: '#1ED760'});
  }

  onPressOut = () => {
    this.setState({signupButtonColor: '#1DB954'});
  }

  render() {
    return (
      <View style={styles.buttonRow}>
        <TouchableWithoutFeedback>
          <View style={[styles.button, {backgroundColor: '#222326'}]}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}>
          <View style={[styles.button, {backgroundColor: this.state.signupButtonColor}]}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default class Day6 extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content');
  }

  render() {
    return (
      <View style={styles.container}>
        <FullVideo />
        <View style={styles.container}>
          <Logo />
          <Buttons />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logo: {
    marginTop: 60,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
    fontFamily: 'Avenir Next',
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  slideTextTitle: {
    color: 'white',
    fontFamily: 'Avenir Next',
  },
  slideText: {
    color: 'white',
    fontFamily: 'Avenir Next',
  }
});
