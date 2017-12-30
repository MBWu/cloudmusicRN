import React , { Component } from 'react';
import { View, Text } from 'react-native';

export default class PrettySonglist extends Component {

    render() {

        return (

            <View style = { {
                flex:1,
                backgroundColor:'blue',
                justifyContent:'center'
            } } >
                <Text>PrettySonglist</Text>
            </View>
        )
    }
}