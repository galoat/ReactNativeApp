import React, { Component } from 'react';
import {
 Platform,
 AppRegistry
} from 'react-native';

import { Navigation } from 'react-native-navigation';

import * as appActions from "./actions/index";


import {store} from "./store/store"


export default class  App extends Component {

  constructor(props) {
    super(props);
    console.log("store ",store)
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(appActions.appInitialized());
  }

  onStoreUpdate() {

      var root = store.getState().rootReducer.root;
      // handle a root change
      // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
      if (this.currentRoot != root) {
        console.log("App root changed current ", this.currentRoot, " => ", root)
        this.currentRoot = root;
        this.startApp(root);
      }
    }

  startApp(root) {
    console.log("start App")
    switch (root) {
        case 'after-login':
          console.log("start Login")
          Navigation.startSingleScreenApp({
                    screen: {
                    screen: 'SkiUt.Login', // unique ID registered with Navigation.registerScree
                    headerMode: 'none',
                    navigationOptions:{ headerVisible:false },
                    navNarHidden: true,
                    tabBarHidden: true,
                    navigatorStyle: {
                      navBarHidden: true
                    }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
                    },
                });
                return;

        case 'login':
            Navigation.startSingleScreenApp({
                screen :
                {
                    screen: 'SkiUt.HomeTab',
                    headerMode: 'none',
                    navigationOptions:{ headerVisible:false },
                    navNarHidden: true,
                    tabBarHidden: true,
                    navigatorStyle: {
                      navBarHidden: true
                    }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
                    },
            });
            return;

          default:
            console.log("Not Root Found");
        }
    }
}
