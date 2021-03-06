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
import {Alert, Vibration, KeyboardAvoidingView,ScrollView,View,Dimensions,Platform} from 'react-native';

 class LoginScreen extends Component {
  static navigationOptions = {
      header: null,
  }
  constructor(props){
     super(props);
     this.state = { try: 0,isLoading:false };
     this.props.try = 0

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
          console.log("Login: will recive props oltry",this.props.try ,"new :",nextProps.try);
          if (nextProps.try !== this.props.try) {
              if(nextProps.try != 0){
                Vibration.vibrate(500)

              }
          }
      }

  render() {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    return (
      <Wallpaper   >
        <Logo testID='welcome'/>

        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>

        <Form
          handleUserInput = {this.handleUserInput}
          username = {this.state.username}
          handlePassword = {this.handlePassword}
          password = {this.state.password}
          nbTry = {this.state.try}
          error = {this.state.error}
          sucess = {this.state.sucess}
          onPushLogin = {this.onPushLogin}
          isLoading = {this.state.isLoading}
          />

          </KeyboardAvoidingView>
       </ScrollView>
      </Wallpaper>
    );
  }


  onPushLogin = () => {
        if (this.state.isLoading) return
        store.dispatch(appActions.login(this.state.try, this.state.username, this.state.password));
        this.setState({isLoading: true});
  }

  handleUserInput(even){

    appActions.inputChangeUser(even)
  }

  handlePassword(even){

    appActions.inputChangePassowrd(even)
  }
}

const mapStateToProps = (state) => {
  console.log("LoginScreenComponent: map state to props: ", state.loginReducer )
  return Object.assign({}, state, {
    try : state.loginReducer.login_try,
    username: state.loginReducer.userName,
    password: state.loginReducer.password,
    sucess : state.loginReducer.login_sucess,
    isLoading : state.loginReducer.isLoading,
    error: state.loginReducer.error
  });
};
export default connect(mapStateToProps)(LoginScreen);
