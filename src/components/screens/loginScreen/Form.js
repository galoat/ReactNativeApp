import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

import usernameImg from '../../../img/username.png';
import passwordImg from '../../../img/password.png';
import eyeImg from '../../../img/eye_black.png';
import * as  appActions from '../../../actions/index';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
    };
    this.showPass = this.showPass.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }
  handlePassword(even){
    console.log("handle password "+even)
  }
  handleUserInput(even){
    console.log("handle user input "+even.value)
    appActions.inputChangeUser(even.value)
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <UserInput
          source={usernameImg}
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          inputValue= {this.props.username}
          handleChange={this.handleUserInput}
        />
        <View style={styles.containerPassword}>
          <UserInput
            source={passwordImg}
            secureTextEntry={this.state.showPass}
            placeholder="Password"
            returnKeyType={'done'}
            autoCapitalize={'none'}
            inputValue= {this.props.password}
            handleChange={this.handlePassword}
            autoCorrect={false}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btnEye}
            onPress={this.showPass}>
            <Image source={eyeImg} style={styles.iconEye} />
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerPassword:{
    flexDirection: 'row',
  },
  btnEye: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
});
