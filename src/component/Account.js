import React , { Component } from 'react';
import { View, Text, Image  } from 'react-native';

export default class AccountScreen extends Component {

    render() {

        return (

            <View style = { {
                flex:1,
                backgroundColor:'blue',
                justifyContent:'center'
            } } >
                
                <Image source={{
                    uri:'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
                }} style={{width: 193, height: 110}} />
            </View>
        )
    }
}