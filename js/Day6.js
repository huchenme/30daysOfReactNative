import React, { Component, PropTypes } from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import Swiper from 'react-native-swiper';

// TODO: pause autoplay after touch

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

const Dot = ({active = false}) => (
  <View style={[styles.dot, active && styles.activeDot]}></View>
)

class HintSwiper extends Component {
  render() {
    return (
      <View style={styles.sliders}>
        <Swiper
          height={Dimensions.get('window').height - 50}
          dot={<Dot />}
          autoplay
          autoplayTimeout={3}
          activeDot={<Dot active />}
          paginationStyle={styles.paginationStyle}
          onTouchEnd={this.onTouch}>
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
      </View>
    )
  }
}

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
      <View style={styles.buttons}>
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
      <View style={StyleSheet.absoluteFill}>
        <FullVideo />
        <View style={StyleSheet.absoluteFill}>
          <Logo />
          <HintSwiper />
          <Buttons />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  sliders: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    top: 0
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
    justifyContent: 'flex-end',
    paddingBottom: 84
  },
  slideTextTitle: {
    color: 'white',
    fontFamily: 'Avenir Next',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600'
  },
  slideText: {
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Avenir Next',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500'
  },
  paginationStyle: {
    bottom: 45
  },
  dot: {
    backgroundColor: '#333',
    width: 7,
    height: 7,
    borderRadius: 7,
    marginLeft: 4,
    marginRight: 4
  },
  activeDot: {
    backgroundColor: 'white'
  }
});
