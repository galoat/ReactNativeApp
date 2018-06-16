import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, View, TextInput, Image} from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default class UserInput extends Component {
  render() {
    var errorValue
    if (this.props.nbTry !=0 ){
      errorValue = this.props.error
    }
    else {
      errorValue = ""
    }
    return (
      <View style={styles.container}>
        <TextField
          value={this.props.inputValue}
          label={this.props.label}
          secureTextEntry={this.props.password}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(e) => this.props.handleChange(e)}
          textColor="white"
          baseColor="white"
          error = {errorValue}
        />
      </View>
    );
  }
}

UserInput.propTypes = {
  password: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  nbTry:  PropTypes.number,
};

UserInput.defaultProp = {
  password : false,
  label : "",
  error: "Eror",
  nbTry: 0,
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
   margin: 15,
   marginTop: 20,
  }
});
