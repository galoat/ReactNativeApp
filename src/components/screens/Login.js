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

     store.dispatch(appActions.loginInitialized());
  }

 componentWillReceiveProps(nextProps){
   console.log("LoginComponent: will recive props");
   this.state = nextProps
 }
/*<Button large onPress={ () => this.()} title="addNb">
<Text> TEST</Text>
</Button>*/
  render() {
    console.log("=========",this.state)
    return (
       <Provider store={store}>
        <View>
            <Button large onPress={ () => this.onLoginPress()} title="Continue">
                <Text> TEST</Text>
            </Button>
            <Button large onPress={ () => this.onIncrementPress()} title="increment">
                <Text> TEST</Text>
            </Button>
              <Text>  {this.state.nb}    </Text>
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

    this.props.dispatch(appActions.increment())
  }

}



const mapStateToProps = (state) => {
  console.log("LoginComponent: map state to props");
  return Object.assign({}, state, {
    nb : state.loginReducer.nb
  });
};

export default connect(mapStateToProps)(Login);
