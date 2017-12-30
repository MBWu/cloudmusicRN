import React , { Component } from 'react';
import { View, Text, WebView } from 'react-native';

export default class CloudExclusiveDetail extends Component {

    static navigationOptions = ( { navigation} ) =>{
        
        return {
            title: navigation.state.params.title
        }
    }

    render() {
        return (

            <WebView 
             source={{uri: '' }}
            />
        )
    }
}
