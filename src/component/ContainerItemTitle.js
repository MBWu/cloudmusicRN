import React , { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PropTypes from 'prop-types'
import { scaleSize, px2dp } from '../fixScreen.js';

class ContainerItemTitle extends Component {

    render(){

        return(

            <View
            
                style={{
                    height: scaleSize( 36 )
                }}
                >
                    <View
                    
                    style = {{ 
                        flex:1,
                        flexDirection: 'row',
                    }}
                    >
                        <View
                        style ={{
                            borderWidth: 3,
                            borderColor: '#69ca19',
                            borderRadius: 3,
                            height: scaleSize( 32 ),
                            marginRight: scaleSize( 11 )
                        }}
                        ></View>
                        <Text
                        style = {{
            
                            fontSize: px2dp( 34 )
                        }}
                        >{ this.props.name }</Text>
                    </View>
                </View>
        )
    }
}

ContainerItemTitle.propTypes = {
    name: PropTypes.string.isRequired
}

export default ContainerItemTitle ;