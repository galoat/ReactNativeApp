import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as  appActions from '../../actions/index';

export default class Hometab extends Component {

onPressLearnMore(){
  appActions.returnLogin()
}
state = {
      names: [
         {'name': 'Ben', 'id': 1},
         {'name': 'Susan', 'id': 2},
         {'name': 'Robert', 'id': 3},
         {'name': 'Mary', 'id': 4},
         {'name': 'Daniel', 'id': 5},
         {'name': 'Laura', 'id': 6},
         {'name': 'John', 'id': 7},
         {'name': 'Debra', 'id': 8},
         {'name': 'Aron', 'id': 9},
         {'name': 'Ann', 'id': 10},
         {'name': 'Steve', 'id': 11},
         {'name': 'Olivia', 'id': 12}
      ]
   }
  render() {
    return (
      <View >
        <Text style={styles.welcome}>
            HOME
        </Text>
        <Button
          onPress={this.onPressLearnMore}
          title="Back"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          />
          <ScrollView>
             {
                this.state.names.map((item, index) => (
                   <View key = {item.id} style = {styles.item}>
                      <Text>{item.name}</Text>
                   </View>
                ))
             }
          </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1'
 },
});
