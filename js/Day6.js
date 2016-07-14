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

export default class Day6 extends Component {
  state = {
    signupButtonColor: '#1DB954'
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content');
  }

  onPressIn = () => {
    this.setState({signupButtonColor: '#1ED760'});
  }

  onPressOut = () => {
    this.setState({signupButtonColor: '#1DB954'});
  }

  render() {
    return (
      <View style={styles.container}>
        <Video
          source={{uri: 'moments'}}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          repeat={true}
          muted />
        <View style={styles.logo}>
          <Image source={require('./assets/spotify.png')} />
        </View>
        <View>
          <View>

          </View>
          <View style={{
            flexDirection: 'row',
          }}>
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
  }
});
