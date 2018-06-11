import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './loginScreen/Logo';
import Form from './loginScreen/Form';
import ButtonSubmit from './loginScreen/ButtonSubmit';
import Wallpaper from './loginScreen//Wallpaper';
import SignupSection from './loginScreen/SignupSection';
import {connect} from 'react-redux';
import {store} from "../../store/store"
import * as appActions from '../../actions/index';
import {Alert, Vibration} from 'react-native';

 class LoginScreen extends Component {
  static navigationOptions = {
      header: null,
  }
  constructor(props){
     super(props);
     this.state = { try: 0 };

  }
  componentWillReceiveProps(nextProps){
    console.log("LoginComponent: will recive props");
    this.setState(nextProps)
  }
  componentWillMount(){
    console.log("LoginComponent - componentWillMount ")
    store.dispatch(appActions.loginInitialized(this.state.try));
  }

  componentWillUpdate(nextProps) {
          console.log("Login: will recive props");
          if (nextProps.try !== this.props.try) {
              if(nextProps.try != 0){
                Vibration.vibrate(500)
                Alert.alert(
                  'Wrong password',
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )
              }
          }
      }


  render() {
    return (
      <Wallpaper  testID='welcome' >
        <Logo />
        <Form
        handleUserInput = {this.handleUserInput}
        username= {this.state.username}
        password = {this.state.password} />
        <ButtonSubmit  />
        <SignupSection />
      </Wallpaper>
    );
  }


  handleUserInput(even){
    appActions.inputChangeUser(even.value)
  }
  
  handlePassword(even){
    appActions.inputChangePassowrd(even.value)
  }
}

const mapStateToProps = (state) => {
  console.log("LoginScreenComponent: map state to props:  try ",state.loginReducer.password);
  return Object.assign({}, state, {
    try : state.loginReducer.login_try,
    username: state.loginReducer.userName,
    password: state.loginReducer.password
  });
};

export default connect(mapStateToProps)(LoginScreen);
