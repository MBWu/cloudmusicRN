import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Scene, Tabs, Modal, Stack, Router, Reducer } from 'react-native-router-flux';

import { scaleSize } from '../fixScreen.js';
import Icon from '../component/Icon.js';

import HomeScreen from '../component/Home.js';

import AduioPlayerScreen from '../component/AduioPlayer.js'; //音乐播放器
import MVPlayerScreen from '../component/MVPlayer.js'; //Mv播放器
import PrivateFMScreen from '../component/PrivateFM.js'; //私人FM
import MyMessageScreen from '../component/MyMessage.js'; //我的消息
import PrivilegeCenterScreen from '../component/PrivilegeCenter.js'; //特权中心
import StoreScreen from '../component/Store.js'; // 商城
import FreeFlowScreen from '../component/FreeFlow.js'; //免流
import SettingScreen from '../component/Setting.js'; // 设置 
import SetTimePauseScreen from '../component/SetTimePause.js'; //定时关闭
import AboutScreen from '../component/About.js'; //关于
import LoginScreen from '../component/Login.js'; //登录
import PlayQualityScreen from '../component/PlayQuality.js'; //播放质量
import DownloadQualityScreen from '../component/DownloadQuality.js'; //下载质量
import EqualizerScreen from '../component/Equalizer.js'; //均衡器
import BluetoothPlayerScreen from '../component/BluetoothPlayer.js'; //
import SongReviewScreen from '../component/SongReview.js'; //歌曲回复
import ExchangeThemeScreen from '../component/ExchangeTheme.js'; //切换主题

import FoundMusic from '../component/FoundMusic.js'; //发现音乐主页

import LatestMusic from '../component/LatestMusic.js'; //最新音乐

import RecommandMV from '../component/RecommandMV.js'; //推荐MV

import CloudExclusive from '../component/CloudExclusive.js'; //网易独家

import SonglistDetail from '../component/SonglistDetail.js'; //歌单详情

import RadioTypeDetail from '../component/RadioTypeDetail.js'; //电台类型详情

import PrettySonglist from '../component/PrettySonglist.js'; //精品歌单

import UserDetail from '../component/UserDetail.js'; //用户详情

import UserActivity from '../component/UserActivity.js'; //用户动态

import UserFans from '../component/UserFans.js'; //用户粉丝

import UserAttention from '../component/UserAttention.js'; //用户关注

import EachDaySonglistRecommand from '../component/EachDaySonglistRecommand.js'; //每日新歌推荐

import Friend from '../component/Friend.js'; //朋友

import MyMusic from '../component/MyMusic.js'; //我的音乐

import Accounts from '../component/Account.js'; //账号

import CloudExclusiveDetail from '../component/CloudExclusiveDetail.js'; //网易独家详情

import AudioPlayerAccess from '../component/AudioPlayerAccess.js'; // 访问audio播放器的icon

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        
      return defaultReducer(state, action);
    };
  };


  const styles = StyleSheet.create ( {
    
        HomeNavigator_TarBarIcon: {
    
            width: scaleSize(48),
            height: scaleSize(48),
        },
        backButton: {
          tintColor: 'white'
        }
    
    } )

export default class Navigator extends Component {

    render(){

        return (

            <Router
            sceneStyle = {{
            }}
            createReducer = { reducerCreate }
            > 
                <Stack
                
                key = 'root'
                >   

                    {
                        //首页
                    }
                    <Tabs
                    key = 'home'
                    swipeEnabled={ false }
                    activeTintColor="#f3f2f3"
                    inactiveTintColor="#848485"
                    tabBarStyle={{ backgroundColor: "#232326" }}
                    showLabel={true}
                    
                  >

                  {
                      //发现音乐
                  }
                    <Scene
                      key="home_foundmusic"
                      hideNavBar
                      tabBarLabel="发现音乐"
                      icon={({ focused }) => (
                        <Icon
                          focused={focused}
                          activeSource={require("../image/cloudmusicActive.png")}
                          inactiveSource={require("../image/cloudmusicInactive.png")}
                          style={styles.HomeNavigator_TarBarIcon}
                        />
                      )}
                     
                    >
                      
                      <Stack
                        key='home_foundmusic_contain'
                      >

                      
                      {
                        //发现音乐主屏
                      }

                      <Scene 
                      key = 'home_foundmusic_main'
                      component = {FoundMusic}
                      renderRightButton = {
                        ()=><AudioPlayerAccess />
                      }
                      />
                        
                        {
                          //歌单详情
                        }
                        <Scene
                        
                        key='home_foundmusic_songlistDetail'
                        navTransparent = { true }
                        tintColor = '#6fdc00'
                        titleStyle = {{
                          color: '#6fdc00'
                          
                        }}
                        getTitle={ ({navigation}) =>{

                          return '歌单'
                        }}
                        component = { SonglistDetail }
                        />

                        {
                          //每日歌曲推荐
                        }
                        <Scene
                        
                        key='home_foundmusic_eachSongRcm'
                        title= { '每日歌曲推荐' }
                        component = { EachDaySonglistRecommand }
                        />

                        {
                          //排行榜
                        }
                        <Scene
                        key='home_foundmusic_ranksDetail'
                        titleStyle = {{
                          color: '#6fdc00'
                        }}
                        backButtonImage = { require('../image/arrow_left_white.png') }
                        title= { '排行榜' }
                        navTransparent = { true }
                        tintColor = '#6fdc00'
                        component = { SonglistDetail }
                        />

                        {
                          //电台类型详情
                        }
                        <Scene
                        
                        key='home_foundmusic_radioCategoryDetail'
                        getTitle={( { navigation } ) =>{ 
                          
                          return navigation.state.params.name;
                        }}
                        component = { RadioTypeDetail }
                        />

                        {
                          //精品歌单
                        }
                        <Scene
                        
                        key='home_foundmusic_prettyGoodSonglist'
                        title= { '精品歌单' }
                        component = { PrettySonglist }
                        />

                        {
                          //用户详情
                        }
                        <Scene
                        
                        key='home_foundmusic_userDetail'
                        getTitle={( { navigation } ) =>{ console.log( navigation )}}
                        component = { UserDetail }
                        />

                        {
                          //用户动态
                        }
                        <Scene
                        
                        key='home_foundmusic_userActivity'
                        title={ '动态' }
                        component = { UserActivity }
                        />

                        {
                          //用户粉丝
                        }
                        <Scene
                        
                        key='home_foundmusic_userFans'
                        title={ '粉丝' }
                        component = { UserFans }
                        />

                        {
                          //用户关注
                        }
                        <Scene
                        
                        key='home_foundmusic_userWatch'
                        title={ '关注' }
                        component = { UserAttention }
                        />

                        {
                          //网易独家
                        }
                        <Scene
                        
                        key='home_foundmusic_only163'
                        title={ '网易独家' }
                        component = { CloudExclusive }
                        />

                        {
                          //最新音乐
                        }
                        <Scene
                        
                        key='home_foundmusic_latestMusic'
                        component = { LatestMusic }
                        />

                        {
                          //推荐MV
                        }
                        <Scene
                        
                        key='home_foundmusic_rcmMV'
                        component = { RecommandMV }
                        />

                        {
                          //电台详情
                        }
                        <Scene
                        
                        key='home_foundmusic_radioDetail'
                        title={ '电台' }
                        component = { SonglistDetail }
                        />
                        
                      </Stack>
                    </Scene>
            

                    {
                        //我的音乐
                    }
                    <Stack
                      key="home_mymusic"
                      tabBarLabel="我的音乐"
            
                      icon={({ focused }) => (
                        <Icon
                          focused={focused}
                          activeSource={require("../image/myMusicActive.png")}
                          inactiveSource={require("../image/myMusicInactive.png")}
                          style={styles.HomeNavigator_TarBarIcon}
                        />
                      )}
            
                    >

                    {
                      //我的音乐主屏
                    }
                      <Scene 
                      
                      key='home_mymusic_main'

                      component={ HomeScreen }
                      />

                      {
                      //最近播放
                      }
                      <Scene 
                      
                      key='home_mymusic_current'
                      title='最近播放'
                      component={ HomeScreen }
                      />

                      {
                        //最近播放
                      }
                      <Scene 
                      
                      key='home_mymusic_myMV'
                      title='我的MV'
                      component={ HomeScreen }
                      />
                      

                        {
                          //我的电台
                        }
                        <Scene 
                        
                        key='home_mymusic_myRadio'
                        title='我的电台'
                        component={ HomeScreen }
                        />

                        {
                          //我的电台
                        }
                        <Scene 
                        
                        key='home_mymusic_songlistDetail'
                        title='歌单'
                        component={ HomeScreen }
                        />
                    </Stack>

                    {
                        //朋友
                    }
                    <Stack
                      key="home_friend"
                      tabBarLabel="朋友"
            
                      icon={({ focused }) => (
                        <Icon
                          focused={focused}
                          activeSource={require("../image/friendActive.png")}
                          inactiveSource={require("../image/friendInactive.png")}
                          style={styles.HomeNavigator_TarBarIcon}
                        />
                      )}
            
                    >

                      {
                        //朋友主屏
                      }
                      <Scene
                        
                        key='home_friend_main'
                        component = {HomeScreen}
                      />


                      {
                        //添加好友
                      }
                      <Scene
                        
                        key='home_friend_addFriend'
                        component = {HomeScreen}
                      />

                      {
                        //热门话题
                      }
                      <Scene
                        
                        key='home_friend_hotTopic'
                        component = {HomeScreen}
                      />
                    </Stack>
            

                    {
                        //账号
                    }
                    <Scene
                      key="home_account"
                      tabBarLabel="账号"
            
                      icon={({ focused }) => (
                        <Icon
                          focused={focused}
                          activeSource={require("../image/accountActive.png")}
                          inactiveSource={require("../image/accountInactive.png")}
                          style={styles.HomeNavigator_TarBarIcon}
                        />
                      )}
            
                      component={ Accounts}
                    />
                  </Tabs>

                      {
                        //音乐播放器
                      }
                    <Scene key='aduioPlayer'
                     component = { AduioPlayerScreen }
                     getTitle = {
                        ( props ) =>{
                          console.log(props);
                        }  
                     }
                     /> 

                    {
                      //MV播放器
                    }
                    <Scene key='mvPlayer' component = { MVPlayerScreen } />

                    {
                      //私人FM
                    }
                    <Scene key='privateFM' component = { PrivateFMScreen } />

                    {
                      //我的消息
                    }
                    <Scene key='myMessage' component = { MyMessageScreen } />

                    {
                      //特权中心 
                    }
                    <Scene key='privilegeCenter' component = { PrivilegeCenterScreen } />

                    {
                      //商城
                    }
                    <Scene key='store' component = { StoreScreen } />

                    {
                      //免流
                    }
                    <Scene key='freeFlow' component = { FreeFlowScreen } />

                    {
                      //设置
                    }
                    <Scene key='setting' component = { SettingScreen } />

                    {
                      //定时关闭
                    }
                    <Scene key='setTimePause' component = { SetTimePauseScreen } />

                    {
                      //关于
                    }
                    <Scene key='about' component = { AboutScreen } />

                    {
                      //登录
                    }
                    <Scene key='login' component = { LoginScreen } />

                    {
                      //播放质量
                    }
                    <Scene key='playQuality' component = { PlayQualityScreen } />

                    {
                      //下载质量
                    }
                    <Scene key='downloadQuality' component = { DownloadQualityScreen } />

                    {
                      //均衡器
                    }
                    <Scene key='equalizer' component = { EqualizerScreen } />

                    {
                      //蓝牙播放器
                    }
                    <Scene key='bluetoothPlayer' component = { BluetoothPlayerScreen } />

                    {
                      //歌曲评论
                    }
                    <Scene key='songReview' component = { SongReviewScreen } />

                    {
                      //切换主题
                    }
                    <Scene key='exchangeTheme' component = { ExchangeThemeScreen } />

                    <Scene key='cloudExclusiveDetail' component = { CloudExclusiveDetail } 

                    getTitle = { (props)=>{
                      console.log(props);
                    }}
                    />
                    
                </Stack>
            </Router>
        )
    }
}
