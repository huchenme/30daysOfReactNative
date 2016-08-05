import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  LayoutAnimation,
} from 'react-native'
import {screenHeight, screenWidth} from './dimensions'
import Icon from 'react-native-vector-icons/MaterialIcons'

const twitterBlue = '#1DA1F2'

const animations = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
  },
  update: {
    type: LayoutAnimation.Types.linear,
    springDamping: 0.5,
  },
}

export default class Day13 extends Component {
  state = {
    text: 'Whats happening?',
    editing: false,
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Icon name='clear' size={30} color={twitterBlue} />
          <TextInput
            ref='textInput'
            multiline
            style={{flex: 1}}
            onFocus={(event) => {
              this.setState({editing: true})
              this.refs.textInput.setNativeProps({
                text: '',
              })
              LayoutAnimation.configureNext(animations)
            }}
            defaultValue='Whats happening?'
          />
        </View>
        <View style={[styles.bottomContainer, {bottom: this.state.editing ? 225 : 0}]}>
          <View style={[styles.toolbar]}>
            <View style={styles.iconsContainer}>
              <View style={styles.icon}>
                <Icon name='location-on' size={30} color='#8899A6' />
              </View>
              <View style={styles.icon}>
                <Icon name='photo-camera' size={30} color='#8899A6' />
              </View>
              <View style={styles.icon}>
                <Icon name='gif' size={30} color='#8899A6' />
              </View>
              <View style={styles.icon}>
                <Icon name='poll' size={30} color='#8899A6' />
              </View>
            </View>
            <View>
              <Text>140</Text>
            </View>
          </View>
          {!this.state.editing && (
            <View style={styles.boxesContainer}>
              <View style={styles.box}>
                <Icon name='photo-camera' size={55} color={twitterBlue} />
              </View>
              <View style={styles.box}>
                <Icon name='videocam' size={65} color={twitterBlue} />
              </View>
              <View style={styles.box}>
                <Icon name='live-tv' size={48} color={twitterBlue} style={{position: 'relative', top: -3}} />
              </View>
              <View style={styles.box}>
              </View>
              <View style={styles.box}>
              </View>
              <View style={styles.box}>
              </View>
            </View>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  box: {
    height: screenWidth / 3 - StyleSheet.hairlineWidth,
    width: screenWidth / 3 - StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: '#E1E8ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: screenWidth,
  },
  boxesContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: '#E1E8ED',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: screenWidth,
    alignItems: 'flex-start',
  },
  topContainer: {
    flex: 1,
  },
  toolbar: {
    height: 53,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
})
