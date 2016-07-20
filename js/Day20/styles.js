import {screenWidth, screenHeight} from '../dimensions';
import * as colors from '../colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1F3C'
  },
  reminderContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    width: screenWidth,
    height: screenHeight - 63,
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: -1,
      width: 0,
    }
  },
  reminderBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight - 63,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15
  },
  headerText: {
    fontSize: 30,
    fontWeight: '500',
    backgroundColor: 'transparent',
    textShadowColor:"rgba(0, 0, 0, 0.3)",
    textShadowOffset:{width:0, height:1},
    textShadowRadius:1,
  },
  todoRow: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  todoTextInput: {
    flex: 1,
    color: '#3F3F3F',
    fontSize: 17,
  },
  todoTextCompleted: {
    color: colors.textSecondary
  },
  addIcon: {
    width: 23,
    height: 23,
    marginRight: 15,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  toggle: {
    width: 23,
    height: 23,
    borderRadius: 23,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#C6C6C6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    width: 15,
    height: 15,
    borderRadius: 15,
  },
  separator: {
    marginLeft: 38
  }
});
