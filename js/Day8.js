import React, { Component, PropTypes } from 'react';
import * as colors from './colors';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const menuWidth = dimensions.width * 0.7;

const Section = ({children}) => (
  <View style={styles.section}>
    {children}
  </View>
)

class Row extends Component {
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
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <MapView
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.drop}></View>
        <View style={styles.menuContainer}>
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
    backgroundColor: 'rgba(0 , 0, 0, 0.6)'
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
    width: menuWidth + 10,
  },
  menu: {
    backgroundColor: 'white',
    width: menuWidth,
    height: dimensions.height,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 2
    }
  }
})
