import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import PropTypes from 'prop-types';

import { createStackNavigator } from 'react-navigation';

export default class App extends Component {
  componentDidMount() {
    loc(this);
  }

  componentWillMount() {
    rol();
    var config = {
        apiKey: 'AIzaSyBY8kRSAdx0E434zoRpghORLiqIqxQSQtY',
        authDomain: 'masterblaster-70716.firebaseapp.com',
        databaseURL: 'https://masterblaster-70716.firebaseio.com',
        projectId: 'masterblaster-70716',
        storageBucket: 'masterblaster-70716.appspot.com',
        messagingSenderId: '662366524594',
        appId: '477900226079405'
    };
    firebase.initializeApp(config);
}

onLoginFacebook = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
        .then((result) => {
            console.log(`login success with permission:${result.grantedPermissions.toString()}`);
            return AccessToken.getCurrentAccessToken();
        })
        .then(data => {
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            return firebase.auth().signInWithCredential(credential);
        })
        .then((currentUser) => {
            console.log(`Facebook Loginwith User ${JSON.stringify(currentUser.user)}`);
            this.props.navigation.navigate('Home', {
              userDetails: currentUser.user,
            });
        })
        .catch((error) => {
            console.log(`Facebook login fail with error ${error}`);
        });
}

  render() {
    return (
      <View style={styles.container} >
          <TouchableOpacity
            style={{backgroundColor:"#FFF", padding:8, borderRadius:5 }}
            onPress={this.onLoginFacebook}
          >
            <Text style={{ color: "#000", fontWeight:"bold" }} > Login With Facebook </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:"center",
    backgroundColor: '#192a56',
  }
});
