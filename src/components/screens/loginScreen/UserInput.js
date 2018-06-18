import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, View, TextInput, Image} from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default class UserInput extends Component {
  render() {
    var errorValue
    if (this.props.error){
      errorValue = this.props.errorLabel
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
  errorLabel: PropTypes.string,
  nbTry:  PropTypes.number,
  error:  PropTypes.bool,
};

UserInput.defaultProp = {
  password : false,
  label : "",
  errorLabel: "Error",
  nbTry: 0,
  error: false
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
   margin: 15,
   marginTop: 20,
  }
});
