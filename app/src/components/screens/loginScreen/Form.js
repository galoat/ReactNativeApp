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


import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import { TextField } from 'react-native-material-textfield';


import * as  appActions from '../../../actions/index';

export default class Form extends Component {
  constructor(props){
     super(props);
     this.passwordRef = this.updateRef.bind(this, 'password');
     this.onSubmitUser = this.onSubmitUser.bind(this);

  }
  render() {
    var errorValue
    if (this.props.error){
      errorValue = "Can't authenticate"
    }
    else {
      errorValue = ""
    }
    return (
      <View style={styles.container}>
        <View   style={styles.textInput}>
          <TextField

              value={this.props.username}
              label={"Username"}
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(e) => this.props.handleUserInput(e)}
              textColor="white"
              baseColor="white"
              error = {errorValue}
              onSubmitEditing = {this.onSubmitUser}
            />
          </View>
          <View   style={styles.textInput}>
            <TextField
              value={this.props.password}
              label={"Password"}
              secureTextEntry={true}
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(e) => this.props.handlePassword(e)}
              textColor="white"
              baseColor="white"
              ref={this.passwordRef}

            />
          </View>
      <View   style={styles.button}>
          <ButtonSubmit
            style={styles.button}
            nb_try = {this.props.nbTry}
            sucess = { this.props.sucess}
            onPushLogin = {this.props.onPushLogin}
            isLoading = {this.props.isLoading}/>
      </View>
    </View>


    );
  }

  updateRef(name, ref) {
        this[name] = ref;
  }

  onSubmitUser() {
      this.password.focus();
  }
}


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
   margin: 15,
   paddingTop: 10,
},
textInput: {
  marginRight: 20,
  marginLeft: 20,

},
button: {
   paddingTop: 50,
},
});
