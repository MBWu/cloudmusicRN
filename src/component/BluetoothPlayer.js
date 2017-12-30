import React , { Component } from 'react';
import { View, Text } from 'react-native';

export default class BluetoothPlayerScreen extends Component {

    render() {

        return (

            <View style = { {
                flex:1,
                backgroundColor:'blue',
                justifyContent:'center'
            } } >
                <Text>BluetoothPlayer</Text>
            </View>
        )
    }
}