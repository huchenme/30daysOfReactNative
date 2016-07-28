import React, {Component, PropTypes} from 'react'
import {
  View,
  Modal,
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Text,
  CameraRoll,
  TouchableHighlight,
} from 'react-native'
import {screenHeight, screenWidth} from './dimensions'

const CustomLayoutLinear = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
  },
}

const intialImageHeight = 129
const activeImageHeight = 258

const Checkbox = ({active = false}) => {
  const icon = active ? require('./assets/day28/check.png') : require('./assets/day28/circle.png')
  return (
    <Image
      style={styles.checkbox}
      source={icon}
    />
  )
}
Checkbox.propTypes = {
  active: PropTypes.bool,
}

export default class Day28 extends Component {
  state = {
    images: [],
    selectActive: false,
    selected: new Set(),
    showPicker: false,
    modalVisible: false,
    dropOpacity: new Animated.Value(0),
  }

  componentWillMount() {
    CameraRoll
      .getPhotos({first: 10})
      .done((data) => this.storeImages(data), (err) => this.logImageError(err))
  }

  storeImages(data) {
    const assets = data.edges
    const images = assets.map((asset) => asset.node.image)
    this.setState({images})
  }

  logImageError(err) {
    console.log(err)
  }

  _selectImage = (index) => {
    let newSelected
    if (this.state.selected.has(index)) {
      newSelected = this.state.selected.delete(index)
    } else {
      newSelected = this.state.selected.add(index)
    }
    this.setState({
      selectActive: true,
      selected: newSelected,
    })
    LayoutAnimation.configureNext(CustomLayoutLinear)
  }

  _onModalShown = () => {
    this.setState({
      showPicker: true,
    })
    Animated.timing(
      this.state.dropOpacity,
      {
        toValue: 1,
        duration: 200,
      }
    ).start()
    LayoutAnimation.configureNext(CustomLayoutLinear)
  }

  _showPicker = () => {
    this.setState({
      modalVisible: true,
    })
  }

  _hidePicker = () => {
    this.setState({
      showPicker: false,
    })
    Animated.timing(
      this.state.dropOpacity,
      {
        toValue: 0,
        duration: 200,
      }
    ).start()
    LayoutAnimation.configureNext(CustomLayoutLinear, () => {
      this.setState({
        modalVisible: false,
        selectActive: false,
        selected: new Set(),
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentInset={{bottom: 44}}>
          <Image source={require('./assets/day28/messages.png')} />
        </ScrollView>
        <Image source={require('./assets/day28/bar.png')} style={styles.bar} />
        <TouchableWithoutFeedback onPress={this._showPicker}>
          <View style={styles.touch} />
        </TouchableWithoutFeedback>
        <Modal
          animationType={'none'}
          transparent
          onShow={this._onModalShown}
          visible={this.state.modalVisible}>
          <TouchableWithoutFeedback onPress={this._hidePicker}>
            <Animated.View
              style={[
                styles.drop,
                {opacity: this.state.dropOpacity},
              ]}
            />
          </TouchableWithoutFeedback>
          <View style={[styles.test, this.state.showPicker ? {bottom: 0} : {top: screenHeight}]}>
            <View style={[styles.rowSection, {backgroundColor: '#F9F9F9'}]}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.imagesContainer}>
                {this.state.images.map((image, index) => {
                  const height = this.state.selectActive ? activeImageHeight : intialImageHeight
                  return (
                    <TouchableWithoutFeedback key={index} onPress={() => {this._selectImage(index)}}>
                      <Image
                        source={{uri: image.uri}}
                        style={{
                          marginLeft: index === 0 ? 0 : 5,
                          height,
                          width: height * image.width / image.height,
                        }}
                      >
                        <View
                          style={{
                            position: 'absolute',
                            right: 14,
                            bottom: 14,
                          }}>
                          <Checkbox active={this.state.selected.has(index)} />
                        </View>
                      </Image>
                    </TouchableWithoutFeedback>
                  )
                })}
              </ScrollView>
              <TouchableHighlight style={styles.row}>
                <Text style={styles.menuText}>
                  {this.state.selected.size === 0 ? 'Photo Library' : `Send ${this.state.selected.size} ${this.state.selected.size > 1 ? 'Photos' : 'Photo'}`}
                </Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.row, {borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#B2C2D2'}]}>
                <Text style={styles.menuText}>
                  {this.state.selected.size === 0 ? 'Take Photo or Video' : 'Add Comment'}
                </Text>
              </TouchableHighlight>
            </View>
            <View style={[styles.rowSection, {marginTop: 8}]}>
              <TouchableHighlight
                style={styles.row}
                onPress={this._hidePicker}
                underlayColor='#EAEAEA'>
                <Text style={[styles.menuText, {fontWeight: '500'}]}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  touch: {
    position: 'absolute',
    bottom: 0,
    left: 6,
    height: 44,
    width: 44,
  },
  drop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  test: {
    position: 'absolute',
    left: 0,
    width: screenWidth,
    padding: 10,
    paddingTop: 0,
    backgroundColor: 'transparent',
  },
  row: {
    height: 57,
    justifyContent: 'center',
  },
  rowSection: {
    borderRadius: 13,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  menuText: {
    color: '#007AFF',
    fontSize: 20,
    textAlign: 'center',
  },
  imagesContainer: {
    margin: 5,
  },
  checkbox: {
    backgroundColor: 'transparent',
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'visible',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOpacity: 0.3,
  },
})
