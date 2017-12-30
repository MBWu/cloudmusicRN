import React , { Component } from 'react';
import { View, Text, StyleSheet, Dimensions,Button } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import { scaleSize, setSpText, px2dp } from '../fixScreen.js';


import PersonalRCMScreen from '../component/PersonalRCMScreen.js'; //个性化推荐

import SongListScreen from '../component/SongListScreen.js'; //歌单


import UperRadioScreen from '../component/UperRadioScreen.js'; //主播电台

import RankScreen from '../component/RankScreen.js'; //排行榜

export default class FoundMusic extends Component {

    constructor( props ){

        super( props );

        this.state = {
            
            page: 0
        }
    }

    _handleJumpPage( index ){

        this.setState({

            page: index
        });
    }
    render(){

        return (
            <ScrollableTabView
            
            page= {this.state.page}
            scrollWithoutAnimation = { true }
            
            tabBarBackgroundColor = '#f9f9f9'
            tabBarUnderlineStyle = {{

                backgroundColor: '#69ca19',
                marginBottom: -1
            }}
            tabBarActiveTextColor = '#69ca19'
            tabBarInactiveTextColor = '#333333'
            >
                <PersonalRCMScreen tabLabel="个性推荐"
                
                handleJumpPage = { this._handleJumpPage.bind( this ) }
                />
                <SongListScreen tabLabel="歌单"  />
                <UperRadioScreen tabLabel="主播电台"  />
                <RankScreen tabLabel="排行榜"  />
            </ScrollableTabView>
        )
    }
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });