import React, { Component } from 'react'; 
import { View , Image, Text, TouchableOpacity } from 'react-native'; 
import PropTypes from 'prop-types';

import { scaleSize, px2dp } from '../fixScreen.js';

const StripListItem = props => (

    <TouchableOpacity
    activeOpacity = { 0.8 }
        onPress = { () =>{

            this.props.onPress( );
        } }
    >
    
        <View
        
        style = {{
            width: scaleSize( 616 ),
            height: scaleSize( 135 ),
            borderTopColor: '#e1e2e3',
            borderTopWidth: 0.5,
        }}
        >
            <View
    
            style = {{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center'
            }}
            >
                <Image
                
                source = {{uri: props.imageUrl }}
                style = {{
                    width: scaleSize( 112 ),
                    height: scaleSize( 112 ),
                }}
                />
                <View
                style = {{
                    height: scaleSize( 135 ),
                    width: scaleSize( 454 )
                }}
                >
                    <View
                    style = {{
    
                        flex: 1,
                        justifyContent: 'center',
                        paddingLeft: scaleSize( 15 )
                    }}
                    >
                        <Text
                        style = {{
                            fontSize: px2dp( 30 ),
                            height: scaleSize( 30 )
                        }}
                        >
                        { props.name }
                        </Text>
                        <Text
    
                        style={{
                            fontSize: px2dp( 28 ),
                            height: scaleSize( 28 ),
                            marginTop: scaleSize( 13 ),
                            color: '#888888'
                        }}
                        >
                        { props.des }
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    </TouchableOpacity>
    )
    StripListItem.propTypes = {
        name: PropTypes.string.isRequired,
        des: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        
    }

export default StripListItem;