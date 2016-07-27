import React, {Component, PropTypes} from 'react'
import fuzzy from 'fuzzy'
import * as colors from './colors'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native'
import SearchBar from 'react-native-search-bar'
import Separator from './Separator'

const data = {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AS': 'American Samoa',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DE': 'Delaware',
  'DC': 'District Of Columbia',
  'FM': 'Federated States Of Micronesia',
  'FL': 'Florida',
  'GA': 'Georgia',
  'GU': 'Guam',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MH': 'Marshall Islands',
  'MD': 'Maryland',
  'MA': 'Massachusetts',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'MP': 'Northern Mariana Islands',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PW': 'Palau',
  'PA': 'Pennsylvania',
  'PR': 'Puerto Rico',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VI': 'Virgin Islands',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming',
}

const Row = ({children}) => {
  let newString = []
  for (let i = 0; i < children.length; i++) {
    if (children[i] === '>') {
      i++
      newString.push(
        <Text style={styles.highlight} key={i}>{children[i]}</Text>
      )
    } else {
      newString.push(
        <Text key={i}>{children[i]}</Text>
      )
    }
  }
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.rowContent}>
          {newString}
        </Text>
      </View>
      <Separator />
    </View>
  )
}
Row.propTypes = {children: PropTypes.element.isRequired}

export default class Day17 extends Component {
  constructor() {
    super()
    this.states = []
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        this.states.push(data[key])
      }
    }
    this.state = {
      states: this.states,
    }
  }

  _onChangeText(text) {
    const options = {pre: '>'}
    const results = fuzzy.filter(text, this.states, options)
    const matches = results.map(function(el) { return el.string })
    this.setState({
      states: matches,
    })
  }

  render() {
    return (
      <ScrollView style={styles.container} contentOffset={{y: 44}}>
        <SearchBar
          placeholder='Search'
          onChangeText={(text) => this._onChangeText(text)}
        />
      {this.state.states.map((state, index) => (
        <Row key={index}>{state}</Row>
      ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  row: {
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowContent: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    color: '#3F3F3F',
    fontSize: 17,
  },
  highlight: {
    color: colors.blue,
    fontWeight: '500',
  },
})
