import React, {Component} from 'react'
import {
  View,
  Modal,
  Text,
  Image,
  Animated,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native'
import {screenWidth, screenHeight} from './dimensions'
import {BlurView} from 'react-native-blur'

export default class Day31 extends Component {
  state = {
    modalVisible: false,
    blurViewOpacity: new Animated.Value(0),
    bgOpacity: new Animated.Value(0),
    blurViewBottom: new Animated.Value(0),
  }

  _menuHeight = 0

  _showModal = () => {
    this.setState({
      modalVisible: true,
    })
  }

  _onModalShown = () => {
    Animated.parallel([
      Animated.timing(
        this.state.bgOpacity,
        {
          toValue: 1,
          duration: 200,
        }
      ),
      Animated.spring(
        this.state.blurViewBottom,
        {
          toValue: 0,
          tension: 70,
          friction: 10,
        },
      ),
    ]).start()
  }

  _hideModal = () => {
    Animated.parallel([
      Animated.timing(
        this.state.bgOpacity,
        {
          toValue: 0,
          duration: 200,
        }
      ),
      Animated.spring(
        this.state.blurViewBottom,
        {
          toValue: -this._menuHeight,
          tension: 80,
          friction: 10,
        },
      ),
    ]).start(() => {
      this.setState({modalVisible: false})
    })
  }

  _onMenuLayout = (event) => {
    const {height} = event.nativeEvent.layout
    this._menuHeight = height
    this.state.blurViewBottom.setValue(-this._menuHeight)
    this.state.blurViewOpacity.setValue(1)
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Modal
          animationType={'none'}
          transparent
          onShow={this._onModalShown}
          visible={this.state.modalVisible}>
          <View style={styles.modal}>
            <TouchableWithoutFeedback onPress={this._hideModal}>
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    opacity: this.state.bgOpacity,
                  },
                ]}
              />
            </TouchableWithoutFeedback>
            <Animated.View
              style={[styles.menu, {
                opacity: this.state.blurViewOpacity,
                bottom: this.state.blurViewBottom,
              }]}>
              <BlurView
                ref='blurView'
                blurType='xlight'
                onLayout={this._onMenuLayout}>
                <TouchableHighlight
                  underlayColor='transparent'
                  onPress={this._hideModal}
                  style={[styles.row, styles.borderBottom]}>
                  <Text style={styles.menuText}>小视频</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor='transparent'
                  onPress={this._hideModal}
                  style={[styles.row, styles.borderBottom]}>
                  <Text style={styles.menuText}>拍照</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor='transparent'
                  onPress={this._hideModal}
                  style={[styles.row]}>
                  <Text style={styles.menuText}>从手机相册选择</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor='transparent'
                  onPress={this._hideModal}
                  style={[styles.row, {marginTop: 6}]}>
                  <Text style={styles.menuText}>取消</Text>
                </TouchableHighlight>
              </BlurView>
            </Animated.View>
          </View>
        </Modal>
        <Image style={styles.image} source={require('./assets/day31.jpg')}>
          <TouchableWithoutFeedback
            onPress={this._showModal}>
            <View style={styles.camIcon} />
          </TouchableWithoutFeedback>
        </Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: screenHeight,
    width: screenWidth,
  },
  menu: {
    width: screenWidth,
    position: 'absolute',
  },
  borderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  row: {
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 18,
  },
  camIcon: {
    position: 'absolute',
    right: 0,
    top: 20,
    width: 44,
    height: 44,
  },
  modal: {
    flex: 1,
  },
})
