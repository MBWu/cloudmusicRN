import React , { Component } from 'react';

import { setSpText, scaleSize } from '../fixScreen.js';

import Icon from './Icon.js';

export default class MusicPlayerAccessBtn extends Component {

    render() {

        return (
            <Icon source = { require( '../image/mPlayerAccess.png' ) } style = { {
                width: setSpText( 20 ),
                height: setSpText( 20 ),
                marginTop: scaleSize( 54 ),
                marginRight: scaleSize( 27 )
            } } />
        )
    }
}