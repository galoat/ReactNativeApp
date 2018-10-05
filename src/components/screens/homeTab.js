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
  TouchableHighlight,
  RefreshControl,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as  appActions from '../../actions/index';
import cat from '../../img/cat.jpg';
import {store} from "../../store/store"
import HTML from 'react-native-render-html';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const htmlContent = ``;

class Hometab extends Component {
  static navigationOptions = {
      header: null,
  }
  constructor(props) {
      super(props);
     
      this.state = {
        scrollY: new Animated.Value(0),
        htmlContent:[],
        refreshing: false,
      };
}

componentWillMount(){
  console.log("Hometab - componentWillMount ")
  store.dispatch(appActions.getAllFeed());
}
componentWillReceiveProps(nextProps){
    console.log("Hometab: will recive props");

    this.setState(nextProps)
}
onPressLearnMore(){
  appActions.returnLogin()
}
_onPressNews(i){
  console.log("Hometab - on press on news ", i)
  appActions.goNews(i)
}
_onRefresh = () => {
    this.setState({refreshing: true});
   console.log("call refresh")
    appActions.actualizedNewsFeed()
  }
_renderScrollViewContent() {
    const data = Array.from(this.state.htmlContent);
    console.log(this.state.htmlContent)
    return (
      <View style={styles.scrollViewContent}  >
        {data.map((_, i) => (
            <TouchableHighlight onPress = {() => this._onPressNews(i)} key={i}>
              <HTML html={ this.state.htmlContent[i].feed} />
          </TouchableHighlight>
        ))}
      </View>
    );
}

  render() {
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const titleScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });
    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });

    return (
     <View style={styles.fill}>
       <StatusBar
       translucent
       barStyle="light-content"
       backgroundColor="rgba(0, 0, 0, 0.251)"
      />

        <Animated.ScrollView
         refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />}
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
        >


            {this._renderScrollViewContent()}
            <Button
              onPress={this.onPressLearnMore}
              title="Back"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
              />
        </Animated.ScrollView>
        <Animated.View
         style={[
           styles.header,
           { transform: [{ translateY: headerTranslate }] },
         ]}
       >
         <Animated.Image
           style={[
             styles.backgroundImage,
             {
               opacity: imageOpacity,
               transform: [{ translateY: imageTranslate }],
             },
           ]}
           source={cat}
         />
       </Animated.View>
       <Animated.View
        style={[
          styles.bar,
          {
            transform: [
              { scale: titleScale },
              { translateY: titleTranslate },
            ],
          },
        ]}
      >
        <Text style={styles.title}>SkiUt</Text>
      </Animated.View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  fill: {
    flex: 1,
},
content: {
 flex: 1,
},
header: {
 position: 'absolute',
 top: 0,
 left: 0,
 right: 0,
 backgroundColor: '#03A9F4',
 overflow: 'hidden',
 height: HEADER_MAX_HEIGHT,
},
backgroundImage: {
 position: 'absolute',
 top: 0,
 left: 0,
 right: 0,
 width: null,
 height: HEADER_MAX_HEIGHT,
 resizeMode: 'cover',
},
bar: {
 backgroundColor: 'transparent',
 marginTop: Platform.OS === 'ios' ? 28 : 38,
 height: 32,
 alignItems: 'center',
 justifyContent: 'center',
 position: 'absolute',
 top: 0,
 left: 0,
 right: 0,
},
title: {
 color: 'white',
 fontSize: 18,
},
scrollViewContent: {
 marginTop: HEADER_MAX_HEIGHT,
},
row: {
 backgroundColor: '#D3D3D3',
 alignItems: 'center',
 justifyContent: 'center',
},
});

const mapStateToProps = (state) => {
  console.log("homeTabComponent: map state to props: ", state.newMoreInfoReducer )
  
  return Object.assign({}, state, {
      htmlContent : state.newMoreInfoReducer.news,
      refreshing:false
  });
};

export default connect(mapStateToProps)(Hometab);
