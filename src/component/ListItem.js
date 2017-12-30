import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { scaleSize, px2dp } from '../fixScreen.js';

// props:
// boxStyle  整个大盒子的样式
// coverStyle  封面的样式
// textStyle  文字的样式
// dev  开发者模式

export default class ListItem extends Component{

    _handlePress(){

        if( this.props.onPress ){

            this.props.onPress();
        }
    }
    render(){

        let coverBorderStyle ={};
        if( this.props.coverStyle ){

            if( this.props.coverStyle.width ){

                coverBorderStyle.width =  this.props.coverStyle.width -1  
            }
            if( this.props.coverStyle.height ){

                coverBorderStyle.height =  this.props.coverStyle.height -1  
            }
        }


        return (
            <TouchableOpacity
            activeOpacity = {1}
            onPress = {()=>{

                this._handlePress();
            }}
            >

            <View
            style = { [{
                width: scaleSize( 190 ),
                height: scaleSize( 268 ),
                marginTop: scaleSize( 21 ),
                paddingBottom: scaleSize( 14 ),
            },  this.props.boxStyle ,
            this.props.dev?{
                backgroundColor: 'red',
            }:null] }
           
            >
        
            <ImageBackground source = { {
                uri: this.props.picUrl
            } }
            style = { [{
                width: scaleSize( 189 ),
                height: scaleSize( 189 ),
                overflow: 'hidden'
            },  this.props.coverStyle,
            this.props.dev?{
                backgroundColor:'yellow',
            }:null] }
            >
        
                <View 
                style = { [{
                    width: scaleSize( 188 ),
                    height: scaleSize( 188 ),
                    borderColor: 'rgba( 0, 0, 0, 0.3 )',
                    borderWidth: 1,

                }, coverBorderStyle] }
                >
                
                </View>
            </ImageBackground>
            
                <Text 
                style = { [{
                    lineHeight: scaleSize( 32 ),
                    height: scaleSize( 64 ),
                    marginTop: scaleSize( 12 ),
                    fontSize: px2dp( 24 ),
                },this.props.textStyle,
                this.props.dev?{
                    backgroundColor: 'green',
                }:null] }
                >
                { this.props.name }
                </Text>
            </View>
            </TouchableOpacity>
            
        )
    }
}

ListItem.propTypes = {
    name: PropTypes.string.isRequired,
    picUrl: PropTypes.string.isRequired
}