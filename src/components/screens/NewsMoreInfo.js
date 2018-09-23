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

import * as appActions from '../../actions/index';

export default class NewsMoreInfo extends Component {

  state = {
     messages: [],
   }

   componentWillMount() {
    appActions.getAllFeed()
     this.setState({
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
     })
   }

   onSend(messages = []) {
     this.setState(previousState => ({
       messages: GiftedChat.append(previousState.messages, messages),
     }))
   }

   render() {
     return (
         <View style={styles.container}>
        <HTML style = {styles.html} html={`<p>Bonjour Comm<strong>&nbsp;</strong></p>
        <p><strong>Tett</strong></p>
        <p style="text-align: center;"><em><strong>OtherTest</strong></em></p>
        <p><strong>&nbsp;</strong></p>`} />
       <GiftedChat
         style={styles.chat}
         messages={this.state.messages}
         onSend={messages => this.onSend(messages)}
         user={{
           _id: 1,
         }}
       />
       </View>
     )
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
