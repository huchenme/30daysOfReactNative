import React, {Component, PropTypes} from 'react';
import * as dimensions from './dimensions';
import {
  Image,
  MapView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
  PanResponder,
  LayoutAnimation,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const menuWidth = dimensions.screenWidth * 0.7;
const minLeft = -menuWidth-10;
const customLayoutLinear = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.left,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

const Section = ({children}) => (
  <View style={styles.section}>
    {children}
  </View>
)
Section.propTypes = {
  children: PropTypes.element.isRequired
}

class Row extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
  }

  state = {
    highlighted: false
  }

  onPressIn = () => {
    this.setState({
      highlighted: true
    })
  }

  onPressOut = () => {
    this.setState({
      highlighted: false
    })
  }

  render() {
    let content;
    if (this.props.icon) {
      content = (
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Icon
            name={this.props.icon}
            style={[
              {
                color: 'rgba(0, 0, 0, 0.54)',
                marginRight: 32
              },
              this.state.highlighted && styles.highlightedText,
            ]}
            size={24} />
          <Text style={[styles.text, this.state.highlighted && styles.highlightedText]}>
            {this.props.children}
          </Text>
        </View>
      )
    } else {
      content = (
        <Text style={[styles.text, this.state.highlighted && styles.highlightedText]}>
          {this.props.children}
        </Text>
      )
    }
    return (
      <TouchableWithoutFeedback
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <View style={[styles.row, this.state.highlighted && styles.highlightedRow]}>
          {content}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const Menu = () => (
  <View style={styles.menu}>
    <Image
      resizeMode="contain"
      source={require('./assets/day8.png')}
      style={styles.image}
    />
    <ScrollView>
      <Section>
        <Row icon="location-on">Your places</Row>
        <Row icon="rate-review">Your contributions</Row>
        <Row icon="signal-wifi-off">Offline areas</Row>
      </Section>
      <Section>
        <Row icon="traffic">Traffic</Row>
        <Row icon="train">Public transport</Row>
        <Row icon="directions-bike">Cycling</Row>
        <Row icon="satellite">Satelite</Row>
        <Row icon="terrain">Terrain</Row>
      </Section>
      <Section>
        <Row>Settings</Row>
        <Row>Add a missing place</Row>
        <Row>Help & feedback</Row>
        <Row>Tips & tricks</Row>
      </Section>
    </ScrollView>
  </View>
)

export default class Day8 extends Component {
  state = {
    showDrop: false,
    dropOpacity: 0,
    menuLeft: minLeft,
  }

  previousMenuLeft = minLeft;
  previousDropOpacity = 0;

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.setState({showDrop: true})
      },
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: this.onPanResponderEnd,
      onPanResponderTerminate: this.onPanResponderEnd,
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });
  }

  onPanResponderMove = (evt, gestureState) => {
    let newMenuLeft = this.previousMenuLeft + gestureState.dx
    let newDropOpacity = this.previousDropOpacity + Math.pow((gestureState.dx / -minLeft), 0.5)
    if (newMenuLeft > 0) {
      newMenuLeft = 0
      newDropOpacity = 1
    }
    if (newMenuLeft < minLeft) {
      newMenuLeft = minLeft
      newDropOpacity = 0
    }
    this.setState({
      menuLeft: newMenuLeft,
      dropOpacity: newDropOpacity
    })
  }

  closeMenu = () => {
    this.previousMenuLeft = minLeft
    this.newDropOpacity = 0
    this.setState({
      dropOpacity: 0,
      menuLeft: minLeft,
      showDrop: false
    })
    LayoutAnimation.configureNext(customLayoutLinear);
  }

  openMenu = () => {
    this.previousMenuLeft = 0
    this.newDropOpacity = 1
    this.setState({
      dropOpacity: 1,
      menuLeft: 0,
    })
    LayoutAnimation.configureNext(customLayoutLinear);
  }

  onPanResponderEnd = (evt, gestureState) => {
    if (gestureState.vx < 0 || gestureState.dx < 0) {
      this.closeMenu()
    } else if (gestureState.vx > 0 || gestureState.dx > 0) {
      this.openMenu()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <MapView
          style={StyleSheet.absoluteFill}
        />
        {this.state.showDrop && (
          <TouchableWithoutFeedback onPress={() => {this.closeMenu()}}>
            <View style={[styles.drop, {opacity: this.state.dropOpacity}]}></View>
          </TouchableWithoutFeedback>
        )}
        <View
          {...this._panResponder.panHandlers}
          style={[styles.menuContainer, {left: this.state.menuLeft}]}>
          <Menu />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: menuWidth
  },
  mapView: StyleSheet.absoluteFill,
  drop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  section: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 8
  },
  row: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  highlightedRow: {
    backgroundColor: '#F0F0F0'
  },
  text: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 13,
    fontWeight: '500'
  },
  highlightedText: {
    color: '#4285F4'
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: menuWidth + 20,
  },
  menu: {
    backgroundColor: 'white',
    width: menuWidth,
    height: dimensions.screenHeight,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 2
    }
  }
})
