import React , { Component } from 'react';
import { View, Text } from 'react-native';

export default class RecommandMV extends Component {

    render() {

        return (

            <View style = { {
                flex:1,
                backgroundColor:'blue',
                justifyContent:'center'
            } } >
                <Text>RecommandMV</Text>
            </View>
        )
    }
}