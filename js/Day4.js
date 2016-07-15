import React, { Component, PropTypes } from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  NativeModules,
  TouchableHighlight
} from 'react-native';

class ShowImg extends Component{
  componentDidMount() {
    React.NativeModules.JTSImagePreview.showImage('day4');
  }

  render() {
    return(
      <View></View>
    )
  }
}

export default class Day4 extends Component {
  state = {
    show: false
  };

  _onImgPress = () => {
    this.setState({
      show:false
    })
    this.setState({
      show:true
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>asd</Text>
        <TouchableHighlight onPress={this._onImgPress}>
          <Image source={{uri: 'day4'}} style={styles.img} />
        </TouchableHighlight>
        {this.state.show && <ShowImg />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 200,
    width: 300
  }
})
