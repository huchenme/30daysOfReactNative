import React from 'react'
import * as colors from './colors'
import {
  View,
  StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
  separator: {
    marginLeft: 15,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.separator,
    flex: 1,
  },
})

const Separator = () => {
  return (
    <View style={styles.separator} />
  )
}

export default Separator
