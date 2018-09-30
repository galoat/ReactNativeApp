import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Animated,
  StatusBar,
  View,
  Platform,
  Button,
  ScrollView,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import HTML from 'react-native-render-html';
import {connect} from 'react-redux';
import * as appActions from '../../actions/index';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class NewsMoreInfo extends Component {
    static navigationOptions = {
      header: null,
  }
  constructor(props) {
      super(props);
     
      this.state = {
          htmlContentFocused:'abc',
           messages: [
         {
           _id: 1,
           text: 'Hello developer',
           createdAt: new Date(),
           user: {
             _id: 2,
             name: 'React Native',
             avatar: 'https://placeimg.com/140/140/any',
           },
         },
       ],
     }
    };



   onSend(messages = []) {
     this.setState(previousState => ({
       messages: GiftedChat.append(previousState.messages, messages),
     }))
   }
   
componentWillReceiveProps(nextProps){
    console.log("newMoreINfoComponent: will recive props");

    this.setState(nextProps)
}
   render() {
 
     console.log("fioejfiojioj",this.props.htmlContentFocused)

     return (
         <View style={styles.container}>
        <HTML style = {styles.html} html={this.props.htmlContentFocused} />
       <GiftedChat
         style={styles.chat}
         messages={this.state.messages}
         onSend={messages => this.onSend(messages)}/>
       </View>
     );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: HEADER_MAX_HEIGHT,
  },
  html: {
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chat: {
    flex:3,
  }
});


const mapStateToProps = (state) => {
  console.log("newMoreINfoComponent: map state to props: ",  state.newMoreInfoReducer.news[state.newMoreInfoReducer.newsFocusedId].feed )
  text = state.newMoreInfoReducer.news[state.newMoreInfoReducer.newsFocusedId].feed 
  return Object.assign({}, state, {
      htmlContentFocused : text
  });
};

export default connect(mapStateToProps)(NewsMoreInfo);
