import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  DeviceEventEmitter,
  TouchableHighlight,
  ScrollView,
  Image
} from 'react-native'
import * as colors from './colors';
import days from './days';
import {screenWidth, screenHeight} from './dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

const DayBox = ({day, index, goToDay}) => (
  <TouchableHighlight
    style={[styles.touchBox, index%3 == 2 && styles.touchBoxRight]}
    underlayColor="#eee"
    onPress={goToDay}>
    <View style={styles.boxContainer}>
      <Text style={styles.boxText}>Day {day.day}</Text>
      {day.isFA
        ? <IconFA size={day.size} name={day.icon} style={[styles.boxIcon,{color:day.color}]}></IconFA>
        : <Icon size={day.size} name={day.icon} style={[styles.boxIcon,{color:day.color}]}></Icon>
      }
    </View>
  </TouchableHighlight>
)

export default class Main extends Component {
  componentWillMount() {
    StatusBar.setBarStyle('default');
    DeviceEventEmitter.addListener(
    'quickActionShortcut', (data) => {
      switch(data.type){
        case "day1":
          this.jumpToDay(0);
          break;
        case "day3":
          this.jumpToDay(1);
          break;
        case "day4":
          this.jumpToDay(2);
          break;
        case "day5":
          this.jumpToDay(3);
          break;
      }
    });
  }

  jumpToDay = (index) => {
    const day = days[index];
    this.props.navigator.resetTo({
      title: day.title,
      component: day.component,
      navigationBarHidden: day.hideNav
    });
  }

  goToDay = (index) => {
    const day = days[index];
    this.props.navigator.push({
      title: day.title,
      component: day.component,
      navigationBarHidden: day.hideNav
    });
  }

  render() {
    return (
      <ScrollView>
        <Swiper
          height={150}
          showsButtons={false}
          autoplay={true}
          activeDot={<View style={styles.activeDot} />}>
          <TouchableHighlight onPress={() => this.goToDay(1)}>
            <View style={styles.slide}>
              <Image
                resizeMode="cover"
                style={styles.image}
                source={require('./assets/banner1.png')} />
              <Text style={styles.slideText}>Day {days[1].day}: {days[1].title}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.goToDay(2)}>
            <View style={styles.slide}>
              <Image
                resizeMode="cover"
                style={styles.image}
                source={require('./assets/banner2.png')} />
              <Text style={styles.slideText}>Day {days[2].day}: {days[2].title}</Text>
            </View>
          </TouchableHighlight>
        </Swiper>
        <View style={styles.touchBoxContainer}>
          {days.map((day, index) => (
            <DayBox
              key={index}
              day={day}
              index={index}
              goToDay={()=>{this.goToDay(index)}}
            />
          ))}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 44,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchBoxContainer:{
    flexDirection: "row",
    flexWrap:"wrap",
    width: screenWidth,
    alignItems: 'flex-start',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor:"#ccc",
    borderBottomWidth: 0
  },
  touchBox: {
    backgroundColor:"#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomColor:"#ccc",
    borderRightColor:"#ccc",
    width: screenWidth/3 - StyleSheet.hairlineWidth,
    height: screenWidth/3 - StyleSheet.hairlineWidth,
  },
  touchBoxRight: {
    borderRightWidth: 0,
  },
  boxContainer: {
    alignItems:"center",
    justifyContent:"center",
    flex: 1
  },
  boxText: {
    position: "absolute",
    bottom: 15,
    width: screenWidth/3,
    textAlign: "center",
    left: 0,
    backgroundColor: "transparent"
  },
  boxIcon:{
    position: "relative",
    top:-10
  },
  slide: {
    flex: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText:{
    position:"absolute",
    bottom: 0,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:"rgba(255,255,255,0.5)",
    width: screenWidth,
    textAlign:"center",
    fontSize: 12
  },
  image:{
    width: screenWidth,
    height: 150
  },
  activeDot: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  }
});
