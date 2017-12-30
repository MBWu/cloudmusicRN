import React , { Component } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { scaleSize, setSpText, px2dp } from '../fixScreen.js';

import store from '../store.js';

import ListItem from './ListItem.js';
import Swiper from './Swiper.js';
import LoadingComponent from './LoadingComponent.js';

class RecommandNewSongListOrMusicOrMV extends Component{

        _renderNewSongListOrMusic = () =>{

           return this.props.fetchData.result.map( ( value , index ) => {
                
                if( this.props.type === 'songlist' ){

                    return (

                            <ListItem 
                            key={ index } 
                            name={ value.name } 
                            picUrl={ value.picUrl }
                            onPress = { ()=>{
                                
                                Actions.push( 'home_foundmusic_songlistDetail',{id: value.id, type:'songlist' } );
                            } }
                            />
                    )
                }else if( this.props.type === 'music' ) {

                    if( index < 6){

                        return (

                            <ListItem 
                            key={ index } 
                            name={ `${ value.name }\n${value.song.artists[0].name} ` } 
                            picUrl={ value.song.album.picUrl } />
                        )
                    }
                }
        } ) 
            
        }        

        _renderMV = ()=>{

                return this.props.fetchData.data.map( ( value, index )=>{
                    
                    return (
                        
                        <ListItem 
                        key={ index } 
                        name={ `${ value.name }\n${value.artistName} ` } 
                        picUrl={ value.cover } 
                        boxStyle={{
                            width: scaleSize( 292 )
                        }}
                        coverStyle={{
                            width: scaleSize( 292 ), height: scaleSize( 164 ) 
                        }}
                        onPress = { ()=> {

                            Actions.push( 'mvPlayer', {id: value.id })
                        } }
                        />
                    )
            }) 
        }
        _renderRadio = ()=>{

            return this.props.fetchData.djRadios.map( ( value , index ) => {

                if( index < 6){

                    return (
                        
                        <ListItem 
                        key={ index } 
                        name={ value.name } 
                        picUrl={ value.picUrl }
                        onPress = { () =>{

                        }}
                        />
                    )
                }
            } ) 
        }
        _renderExclusive = ()=>{

            return this.props.fetchData.result.map( (value, index )=>{

                if( index<2){

                    return (

                        <ListItem 
                        key={ index } 
                        name={ value.name } 
                        picUrl={ value.picUrl } 
                        boxStyle={{
                            width: scaleSize( 292 )
                        }}
                        coverStyle={{
                            width: scaleSize( 292 ), height: scaleSize( 164 ) 
                        }}

                        onPress = { ()=>{
                            Actions.push( 'cloudExclusiveDetail', {title: value.name, } )
                        }}
                        />
                    )
                }else{

                    return (

                        <ListItem 
                        key={ index } 
                        name={ value.name } 
                        picUrl={ value.sPicUrl } 
                        boxStyle={{
                            width: scaleSize( 600 ),
                            height: scaleSize( 222 )
                        }}
                        coverStyle={{
                            width: scaleSize( 600 ),
                        }}
                        onPress = { ()=>{
                            Actions.push( 'cloudExclusiveDetail', {title: value.name, } )
                        }}
                        />
                    )
                }
            })
        }
        render(){
            
            let contain;

            switch( this.props.type ){

                case 'songlist':
                case 'music':
                    contain = this._renderNewSongListOrMusic;
                    break;
                case 'exclusive':
                    contain = this._renderExclusive;
                    break;
                case 'mv':
                    contain = this._renderMV;
                    break;
                default:
                    contain = this._renderRadio;
                    break;
            }
            return (
    
                <View 

                    style = { styles.PersonalRCMScreen_RcmSonglistItemWrapBox }
                >
                
                    {
                        //template fetchData
                    }

                        { contain() }
                </View>
            )
        }
    }

const RCMItemArr = [
    {
        title: '推荐歌单',
        source: require( '../image/songlistIcon.png' ),
        toPage: 1,
        childrenComponent: (

            <LoadingComponent fetchUrl={ 'http://localhost:3000/personalized' } minHeight= { scaleSize(291)} >
                <RecommandNewSongListOrMusicOrMV type='songlist' />
            </LoadingComponent>
        )
    },
    {
        title: '独家放送',
        source: require( '../image/songlistIcon.png' ),
        navigationDirection: 'home_foundmusic_only163',
        childrenComponent: <LoadingComponent fetchUrl={ 'http://localhost:3000/personalized/privatecontent' } minHeight= { scaleSize(291)} >
                            <RecommandNewSongListOrMusicOrMV type='exclusive' />
                        </LoadingComponent>
    },
    {
        title: '最新音乐',
        source: require( '../image/songlistIcon.png' ),
        navigationDirection: 'home_foundmusic_latestMusic',
        childrenComponent:  (
            
            <LoadingComponent fetchUrl={ 'http://localhost:3000/personalized/newsong' } minHeight= { scaleSize(291)} >
                <RecommandNewSongListOrMusicOrMV type='music' />
            </LoadingComponent>
        )
    },
    {
        title: '推荐MV',
        source: require( '../image/songlistIcon.png' ),
        navigationDirection: 'home_foundmusic_rcmMV',
        childrenComponent: (

            <LoadingComponent fetchUrl={ 'http://localhost:3000/mv/first?limit=4' } minHeight= { scaleSize(291)} >
                <RecommandNewSongListOrMusicOrMV type='mv' />
            </LoadingComponent>
        )
    },
    {
        title: '主播电台',
        source: require( '../image/songlistIcon.png' ),
        toPage: 2,
        childrenComponent:  (
            
            <LoadingComponent fetchUrl={ 'http://localhost:3000/dj/recommend' } minHeight= { scaleSize(291)} >
                <RecommandNewSongListOrMusicOrMV type='radio' />
            </LoadingComponent>
        )
    },
];

const FunBarArr = [
    
    {
        title: '私人FM',
        source: require( '../image/privateFMAccessBtn.png' ),
        navigationDirection: 'aduioPlayer'
    },
    {
        title: '每日歌曲推荐',
        source: require( '../image/eachSongRcmAccessBtn.png' ),
        navigationDirection: 'home_foundmusic_eachSongRcm'
    },
    {
        title: '云音乐热歌榜',
        source: require( '../image/cloudmusicHotRankAccessBtn.png' ),
        navigationDirection: 'home_foundmusic_ranksDetail',
        params: {
            id: 3778678,
            type: 'rank',
            name: '热歌榜'
        }
    }
]

export default class PersonalRCMScreen extends Component {

    render() {
        
        return (

            <View
            
            style = { styles.PersonalRCMScreen_WrapBox }
            >
            <ScrollView
            >
                
                {
                    //轮播图
                }

                    <Swiper height={ scaleSize( 236 ) } type='scroll' horizontal={ true }  >
                        <View style={{
                            backgroundColor: 'green'
                        }} ></View>
                        <View style={{
                            backgroundColor: 'yellow'
                        }} ></View>
                        <View style={{
                            backgroundColor: 'blue'
                        }} ></View>
                        <View style={{
                            backgroundColor: 'black'
                        }} ></View>
                    </Swiper>

                {
                    //功能栏
                }
                <View
                
                style = { styles.PersonalRCMScreen_FunBarBox }
                >
                    
                    { FunBarArr.map( ( value,index ) =>{

                        return (
                            <FunBarItem 
                            
                            key = {index}
                            title= {value.title}
                            source= { value.source }
                            navigationDirection= { value.navigationDirection }
                            params = { value.params }
                            />
                        )
                    })}
                </View>

                {
                    //推荐歌单
                }
                <RCMContainer handleJumpPage = { this.props.handleJumpPage } />

            </ScrollView>
            </View>
        )
    }
}


const FunBarItem = props =>{
    
        return(
            <View
            style = { styles.PersonalRCMScreen_FunBarItemBox }
            >
                <View
                
                style = { styles.PersonalRCMScreen_FunBarItemIconBox }
                onTouchStart = { ( ) =>{
    
                    Actions.push( props.navigationDirection, props.params )
                }}
                >
                    <Image source = { props.source } style = { styles.PersonalRCMScreen_FunBarItemIcon } />
                </View>
                <Text
                style = {{
                    fontSize: px2dp( 26 )
                }}
                >
                    {props.title}
                </Text>
            </View>
        )
    }

class RCMContainer extends Component {
    
    

    render(){

        return (
            <View>

            { RCMItemArr.map( (value,index) =>{

                return (

                    <RCMItem 
                    
                    key={ index }
                    title={ value.title }
                    navigationDirection={ value.navigationDirection }
                    toPage = { value.toPage }
                    handleJumpPage = { this.props.handleJumpPage }
                    source={ value.source }
                    childrenComponent={ value.childrenComponent }
                    />
                )
            })}
            
            </View>
        )
    }
}


class RCMItem extends Component{

    render(){

        return(
            <View>
            
                <View
                
                style = { styles.PersonalRCMScreen_RcmSonglistTitleBox }
                >
                    
    
                    <Text
                    
                    style = { styles.PersonalRCMScreen_RcmSonglistTitle }
                    >
                        <Image source = { this.props.source } style = { styles.PersonalRCMScreen_RcmSonglistTitleIcon } /> 
                        { this.props.title }
                    </Text>
                    <Text
                    
                    style = { styles.PersonalRCMScreen_RcmSonglistTitleMore }
                    onPress = { () => {
    
                       this.props.navigationDirection? Actions.push( this.props.navigationDirection ) : this.props.handleJumpPage( this.props.toPage );
                        
                    } }
                    >
                        更多 >
                    </Text>
                </View>

                { this.props.childrenComponent }
    
            </View>
        )
    }
}



const styles = StyleSheet.create( {
    
        PersonalRCMScreen_WrapBox: {
            marginTop: -20,
            flex:1,
            backgroundColor: '#fff'
        },
    
        PersonalRCMScreen_FunBarBox: {
            flex:1,
            flexDirection: 'row' ,
            height: scaleSize( 199 ) ,
            backgroundColor: '#fff',
            borderBottomColor: '#e1e2e3',
            borderBottomWidth: 1,
        },
    
        PersonalRCMScreen_FunBarItemBox: {
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        },
    
        PersonalRCMScreen_FunBarItemIconBox: {
            alignItems: 'center',
            justifyContent: 'center',
            width: scaleSize( 98 ),
            height: scaleSize( 98 ),
            marginBottom: scaleSize( 15 ),
            borderRadius: scaleSize( 50 ),
            borderColor: '#69CA19',
            borderWidth: scaleSize( 1 )
        },
    
        PersonalRCMScreen_FunBarItemIcon: {
            width: scaleSize( 48 ),
            height: scaleSize( 46 )
        },
    
        PersonalRCMScreen_RcmSonglistTitleBox: {
    
            flex:1,
            flexDirection: 'row',
            height: scaleSize( 71 ),
            paddingLeft: scaleSize( 22 ),
            paddingTop: scaleSize( 34 )
        },
        PersonalRCMScreen_RcmSonglistTitle: {
    
            flex:1,
            fontSize: px2dp(32)
        },
        PersonalRCMScreen_RcmSonglistTitleIcon: {
    
            marginTop: scaleSize( 6 ),
            width: scaleSize( 32 ),
            height: scaleSize( 30 )
        },
        PersonalRCMScreen_RcmSonglistTitleMore: {
    
            flex:1,
            textAlign: 'right',
            paddingRight: scaleSize( 19 ),
            fontSize: px2dp( 26 ),
            color: '#707070',
        },
    
        PersonalRCMScreen_RcmSonglistItemWrapBox: {
    
            flex:1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            minHeight: scaleSize( 291 )
        },
        PersonalRCMScreen_RcmSonglistItemBox: {
    
            width: scaleSize( 190 ),
            height: scaleSize( 268 ),
            marginTop: scaleSize( 21 ),
            paddingBottom: scaleSize( 14 ),
        }
    } )