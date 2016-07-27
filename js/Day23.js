import React, {Component, PropTypes} from 'react'
import {
  View,
  Text,
  StyleSheet,
  WebView,
  TouchableHighlight,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {screenWidth} from './dimensions'

class Poincare extends Component{
  render() {
    return(
      <WebView
        source={require('./public/demo1.html')}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate='fast'
        startInLoadingState={true}
      />
    )
  }
}

class Sphere extends Component{
  render() {
    return(
      <WebView
        source={require('./public/demo2.html')}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate='fast'
        startInLoadingState={true}
      />
    )
  }
}

export default class Day23 extends Component {
  static propTypes = {
    navigator: PropTypes.any.isRequired,
  }

  _show(index) {
    if (index) {
      this.props.navigator.push({
        title: 'Sphere',
        component: Sphere,
      })
    }else{
      this.props.navigator.push({
        title: 'Poincare',
        component: Poincare,
      })
    }
  }

  render() {
    return(
      <View style={styles.menu}>
        <TouchableHighlight style={styles.btn} onPress={() => this._show(0)}>
          <View>
            <Image source={require('./assets/day23/poincare.png')} style={styles.img} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Poincaré Disk</Text>
              <Icon style={styles.itemNav} name='ios-arrow-forward' size={35} />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.btn} onPress={() => this._show(1)}>
          <View>
            <Image source={require('./assets/day23/sphere.jpg')} style={styles.img} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Sphere</Text>
              <Icon style={styles.itemNav} name='ios-arrow-forward' size={35} />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  menu: {
    paddingTop: 64,
  },
  btn: {
    height: 100,
    marginBottom: 20,
    width: screenWidth,
  },
  img: {
    height: 100,
    width: screenWidth,
    resizeMode: 'cover',
  },
  textContainer: {
    height: 100,
    width: screenWidth,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '500',
    paddingLeft: 20,
  },
  itemNav: {
    color: '#fff',
    position: 'absolute',
    right: 20,
    top: 32,
  },
})
