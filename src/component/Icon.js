import React , { Component } from 'react';
import { Image } from 'react-native';

export default class Icon extends Component{

    render() {

        let source,style;

        if( !this.props.source ){

            if( this.props.focused ){
                
                            source = this.props.activeSource;
                            
                        }else {
                
                            source = this.props.inactiveSource;
                
                        }
        }else {

            source = this.props.source;
        }

        return (

            <Image source = { source } style = { [ this.props.style , this.props.focused? this.props.activeStyle : this.props.inactiveStyle] } />
        )
    }
}