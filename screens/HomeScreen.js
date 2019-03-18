import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk'

export default class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false,
    };

    clickLogout = () => {
        LoginManager.logOut();
        this.props.navigation.popToTop()
    }

    render() {
        const { navigation } = this.props;
        const user_Details = navigation.getParam('userDetails', null);
        console.log("User details:-" + user_Details);
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "black", fontWeight: "900", margin: 10, fontSize: 30 }}>User Infromation</Text>
                <Image
                    style={{ width: 50, height: 50, marginTop: 10, marginBottom: 10 }}
                    source={{ uri: user_Details.photoURL}}
                />
                <Text style={{ color: "black", fontWeight: "700", margin: 5 }}>User Email ID:- {user_Details.email}</Text>
                <Text style={{ color: "black", fontWeight: "700", margin: 5 }}>User Name:- {user_Details.displayName}</Text>

                <TouchableOpacity onPress={this.clickLogout} style={{ backgroundColor: "blue", marginTop: 10, borderRadius: 5 }}>
                    <Text style={{ color: "white", fontWeight: "700", margin: 10 }}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}