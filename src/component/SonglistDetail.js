import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { BlurView } from 'react-native-blur';

import { scaleSize, px2dp } from "../fixScreen.js";
import store from '../store.js';

export default class SonglistDetail extends Component {
    constructor( props ){

        super( props );
        
        this.state = {

            fetched: false,
            fetchError: false,
            data: null
        }
        
    }
    componentDidMount(){

        this._fetchData();
    }

    _fetchData = ()=>{

        let { state } = this.props.navigation;

        let fetchUrl = '';

        switch( state.params.type ){
            case 'songlist':
            case 'rank':
                fetchUrl = `http://localhost:3000/playlist/detail?id=${state.params.id}`;
                break;
            default:
                break;
        }

        fetch( fetchUrl )
            .then( response => response.json() , error => {

                this.setState({
                    fetched: true,
                    fetchError: true
                });
            }).then( json => {

                if( !this.state.fetchError ){

                    this.setState({
                        fetched: true,
                        data: json
                    })
                }
            } )
    }

  _renderLoadingComponent = () =>(
      <View
      style={{
          flex:1,
          justifyContent: 'center',
          alignItems: 'center',
            backgroundColor: "#f9f9f9"
      }}
      >
        <ActivityIndicator />
      </View>
  )

  _renderErrorComponent = () =>(
    <View
    style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#f9f9f9"
    }}
    >
      <Text>Error</Text>
    </View>
)

 _render = () =>(
    <FlatList
    style={{
      flex: 1,
      backgroundColor:'#fff'
    }}

    initialNumToRender = {20}
    ListHeaderComponent={this._renderHeaderComponent}
    
    getItemLayout={(data, index) => (
        {length: scaleSize(99), offset: scaleSize(99) * index, index}
      )}

    data={
        this.state.data.playlist.tracks
    }
    keyExtractor={
        ( value, index)=> index
    }
    renderItem = {
        this._renderItem
    }
  >
  </FlatList>
 )

  _renderHeaderComponent = () => (
    <View>

      <HeaderCover  
      imageUrl = { this.state.data.playlist.coverImgUrl }
      subscribedCount = { this.state.data.playlist.subscribedCount }
      shareCount = { this.state.data.playlist.shareCount }
      commentCount = { this.state.data.playlist.commentCount }
      updateTime = { this.state.data.playlist.updateTime }
      type = { this.props.navigation.state.params.type }
      />
      <HeaderPlayButton
      tracks = { this.state.data.playlist.tracks }
      trackCount = { this.state.data.playlist.trackCount }
      />
    </View>
  );

  _renderItem = ( { item, index } ) =>{

    if( index < 100){
        return (
            <ListItem 
            dispatchType = {'music_insert'}
            dispatchPayload = {
              item
            }
            leftComponent = {
                <View
                style={{
                    flex:1,
                    alignItems:'center',
                    justifyContent: 'center'
                }}
                >
                    <Text
                    style={{
                        color:'#69ca19',
                        fontSize: px2dp( 32 ),
                        fontWeight: 'bold'
                    }}
                    >
                    {
                        //排名
                    }
                    {
                        (index+1) < 10 ? `0${index+1}`: index+1
                    }
                    </Text>
                </View>
            }
            rightComponent = {
                <View
                style={{
                    flex:1,
                    justifyContent: 'space-around',
                    paddingTop: scaleSize( 10 ),
                    width: scaleSize( 495 ),
                }}
                >
                    <Text
                    style={{
                        fontSize: px2dp( 34 ),
                        height: scaleSize( 34 ),
                        fontWeight: '500',
                        color: '#333333',
                    }}
                    >
                    {
                        //歌曲名
                    }
                        {item.name}
                    </Text>
                    <Text
                    style={{
                        fontSize: px2dp( 22 ),
                        height: scaleSize( 22 ),
                        fontWeight: 'bold',
                        color: '#888888',
                    }}
                    >
    
                    {
                        //歌手，专辑
                    }
                        {item.ar.map ( (value , index) =>{
    
                            if( index === (item.ar.length-1) ){
                                return value.name;
                            }else{
                                 return value.name+'/'
                            }
                        } )}
                         - 
                        {
                            item.al.name
                        }
                    </Text>
                </View>
            }
        />
        )
    }
  }

  render() {
    return (
      this.state.fetched? ( this.state.fetchError ? this._renderErrorComponent() : this._render() ) : this._renderLoadingComponent()
    );
  }
}


const HeaderPlayButton = props => (
  <ListItem
    
    dispatchType = { 'music_Addall' }
    dispatchPayload = {
      props.tracks
    }
    leftComponent={
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          source={require("../image/play.png")}
          style={{
            width: scaleSize(36),
            height: scaleSize(36)
          }}
        />
      </View>
    }

    rightComponent={
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            color: "#333333",
            fontSize: px2dp(34),
            fontWeight: "bold"
          }}
        >
          播放全部
        </Text>
        <Text
          style={{
            color: "#d5d6d6",
            fontSize: px2dp(27),
            fontWeight: "bold"
          }}
        >
          { `共${props.trackCount}首` }
        </Text>
      </View>
    }
  />
);


class HeaderCover extends Component {


    //渲染功能栏
  _renderFunBar = () => {

    const dataDealWith = ( num ) =>{
        let str = `${num}`;
        if( parseInt( num ) >100000){
            return str.slice(0, str.length-4);
        }else{
            return str;
        }
    }

    //订阅，分享，讨论
    const subscribedCount = dataDealWith( this.props.subscribedCount );
    const shareCount = dataDealWith( this.props.shareCount );
    const commentCount = dataDealWith( this.props.commentCount );


    //功能
    const funBarItems = [
      {
        imageUrl: require("../image/collection.png"),
        text: subscribedCount
      },
      {
        imageUrl: require("../image/forum.png"),
        text: commentCount
      },
      {
        imageUrl: require("../image/share.png"),
        text: shareCount
      },
      {
        imageUrl: require("../image/download.png"),
        text: "下载"
      }
    ];

    return (
      <View
        style={{
          height: scaleSize(116),
          backgroundColor:'rgba(0,0,0,0)',
          top: scaleSize(360)
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row"
          }}
        >
          {funBarItems.map((value, index) => {
            return this._renderFunBarItem(value.imageUrl, value.text, index);
          })}
        </View>
      </View>
    );
  };

  //功能栏item
  _renderFunBarItem = (imageUrl, text, key) => (
    <View
      key={key}
      style={{
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center"
      }}
    >
      <Image
        source={imageUrl}
        style={{
          width: scaleSize(42),
          height: scaleSize(42)
        }}
      />
      <Text
        style={{
          color: "#bdc8d8",
          fontSize: px2dp(26),
          fontWeight: "bold"
        }}
      >
        {text}
      </Text>
    </View>
  );

  _renderUpdateTime = ()=>{

    let date = new Date( this.props.updateTime );

    return `最近更新：${date.getMonth()}月${date.getDate()}日`
    
  }

  render() {

    return (

      //背景图
      <ImageBackground
        source={{ uri: this.props.imageUrl }}
        style={{
          height: scaleSize(512),
          position:'relative'
        }}
      >
      {
        //更新日期
      }
      <Text
        style={{
          backgroundColor:'rgba(0,0,0,0)',
          top: scaleSize(330),
          left: scaleSize(52),
          color: "#c4cee1"
        }}
      >
        { this._renderUpdateTime()}
      </Text>

      {
        //收藏，分享，评论
      }
      {this._renderFunBar()}
      </ImageBackground>
    );
  }
}


{
  //每首单曲
}
const ListItem = props => (

  <TouchableWithoutFeedback
  underlayColor = 'rgba(0,0,0,0.8)'
  onPress = {
    ()=>{
      console.log(props.dispatchType);
      //加入单曲或者整个歌单 进入歌单数组
      store.dispatch(
        {
          type: props.dispatchType,
          payload: props.dispatchPayload
        }
      )
      //跳转到播放器
      Actions.push( 'aduioPlayer' )
    }
  }
  >
    <View
      style={{
        height: scaleSize(99)
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row"
        }}
      >
        
        <View
          style={[{
            width: scaleSize(79),
            height: scaleSize(99),
            backgroundColor: props.dev? 'red' : null    
          }
        ]}
        >
          {props.leftComponent}
        </View>

        
        <View
          style={{
            width: scaleSize(564),
            borderBottomColor: "#e1e2e3",
            borderBottomWidth: 1,
            backgroundColor: props.dev? 'green' : null
          }}
        >
          {props.rightComponent}
        </View>
      </View>
    </View>
  </TouchableWithoutFeedback>
);
