import React , { Component } from 'react';
import { Image,TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { scaleSize } from '../fixScreen.js';

const AudioPlayerAccess = props => (
    props.songlistLength > 0 ? 
    (   
        <TouchableWithoutFeedback
        onPress = {
            ()=>{
                Actions.push('aduioPlayer');
            }
        }
        >
            <Image 
            source = { require('../image/mPlayerAccess.png') }
            style = {{
            width: scaleSize( 50 ),
            height: scaleSize( 41 ),
            marginRight: scaleSize( 30 )
            }}
                                    
        />
        </TouchableWithoutFeedback>
        
    ):
    (
        null
    )
)
const mapStateToProps = state =>({
    songlistLength: state.audioSonglist.songlist.length
})

export default connect(mapStateToProps)(AudioPlayerAccess);