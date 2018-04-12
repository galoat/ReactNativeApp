import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  Text,
  Button,
  View
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import { Provider } from 'react-redux';
import * as  appActions from '../../actions/index';

import {store} from "../../store/store"

export class Login extends Component {
  constructor(props) {
    super(props);
     this.state = { nb: 0 };
    store.subscribe(this.onStoreLoginUpdate.bind(this));

  }
onStoreLoginUpdate(){
  console.log("Login: on store update : new state ", store.getState().loginReducer)
  if(this.state != store.getState().loginReducer){
    this.setState({
        nb : store.getState().loginReducer.nb
    });
  }
}

  render() {
    console.log("=========",this.state)
    return (
       <Provider store={store}>
        <View>
            <Button large onPress={ () => this.onLoginPress()} title="Continue">
                <Text> TEST</Text>
            </Button>
            <Button large onPress={ () => this.onIncrementPress()} title={this.state.nb}>

            </Button>
        </View>
      </Provider>

    );
  }

  /*
  onLoginPress:
    Changes the root value of the app to be 'after-login', changing it to tab view
  */
  onLoginPress() {

    this.props.dispatch(appActions.login());

  }

  onIncrementPress(){
    this.props.dispatch(appActions.onIncrementPress())
  }
}


export default connect()(Login);
