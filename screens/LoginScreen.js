import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import PropTypes from 'prop-types';

export default class Login extends Component {

    // constructor(props){
    //     super(props);
    //     this.unsubscriber = null;
    //     this.state={
    //         isAuthenticate: false,
    //         typeEmail: '',
    //         typePassword: '',
    //         user: null,
    //     };
    // }

    // componentDidMount(){
    //     this.unsubscriber = firebase.auth().onAuthStateChanged((changedUser)=>{
    //         this.setState({user: changedUser});
    //     })
    // }

    componentWillMount() {
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
                console.log(`Facebook Loginwith User ${JSON.stringify(currentUser)}`);
                // if (JSON.stringify(currentUser) !== "{}") {JSON.stringify(currentUser.toString());
                // }
            })
            .catch((error) => {
                console.log(`Facebook login fail with error ${error}`);
            });
    }

    onLoginGoogle = () => {
        GoogleSignin
            .signIn(['public_profile'])
            .then((data) => {
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
                return firebase.auth().signInWithCredential(credential);
            })
            .then((currentUser) => {
                console.log(`Google login with user:${JSON.stringify(currentUser)}`);
            })
            .catch((error) => {
                console.log(`login fail with error:${error}`);
            });
    }

    render() {
        return (
            <View style={{ flex: 1, top: "10%" }} >
                <TouchableOpacity
                    style={{
                        padding: 10,
                        width: "30%",
                        margin: 20,
                        alignItems: 'center',
                        borderRadius: 5,
                        backgroundColor: 'rgb(73, 104, 173)'
                    }}
                    onPress={this.onLoginFacebook}
                >
                    <Text style={{ color: "#fff", fontSize: 16, fontWeight: 'bold' }} > facebook </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        padding: 10,
                        width: "30%",
                        margin: 20,
                        alignItems: 'center',
                        borderRadius: 5,
                        backgroundColor: 'rgb(73, 104, 173)'
                    }}
                    onPress={this.onLoginGoogle}
                >
                    <Text style={{ color: "#fff", fontSize: 16, fontWeight: 'bold' }} > Gmail </Text>
                </TouchableOpacity>
            </View>
        );
    }
};