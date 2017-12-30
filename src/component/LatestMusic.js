import React , { Component } from 'react';
import { View, Text } from 'react-native';

export default class LatestMusic extends Component {

    render() {

        return (

            <View style = { {
                flex:1,
                backgroundColor:'blue',
                justifyContent:'center'
            } } >
                <Text>LatestMusic</Text>
            </View>
        )
    }
}