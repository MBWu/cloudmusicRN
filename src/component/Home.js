import React, { Component } from "react";
import { View, Button, ScrollView, StyleSheet, Text } from "react-native";
import { Tabs, Scene, Actions} from 'react-native-router-flux';
import {
  NavigationActions,
  TabNavigator,
  addNavigationHelpers
} from "react-navigation";
import {
  createIconSetFromIcoMoon,
  createIconSetFromFontello
} from "react-native-vector-icons";
import { connect } from "react-redux";

import { scaleSize, px2dp } from "../fixScreen.js";

import Icon from "./Icon.js";

const styles = StyleSheet.create({
  HomeNavigator_TarBarIcon: {
    width: scaleSize(48),
    height: scaleSize(48)
  }
});

// const HomeNavigatorScreen = TabNavigator(
//   {
//     FoundMusic: {
//       screen: FoundMusicScreen,
//       navigationOptions: {
//         tabBarIcon: ({ focused }) => (
//           <Icon
//             focused={focused}
//             activeSource={require("../image/cloudmusicActive.png")}
//             inactiveSource={require("../image/cloudmusicInactive.png")}
//             style={styles.HomeNavigator_TarBarIcon}
//           />
//         ),
//         tabBarLabel: "发现音乐"
//       }
//     },
//     MyMusic: {
//       screen: MyMusicScreen,
//       navigationOptions: {
//         tabBarIcon: ({ focused }) => (
//           <Icon
//             focused={focused}
//             activeSource={require("../image/myMusicActive.png")}
//             inactiveSource={require("../image/myMusicInactive.png")}
//             style={styles.HomeNavigator_TarBarIcon}
//           />
//         ),
//         tabBarLabel: "我的音乐"
//       }
//     },
//     Friend: {
//       screen: FriendScreen,
//       navigationOptions: {
//         tabBarIcon: ({ focused }) => (
//           <Icon
//             focused={focused}
//             activeSource={require("../image/friendActive.png")}
//             inactiveSource={require("../image/friendInactive.png")}
//             style={styles.HomeNavigator_TarBarIcon}
//           />
//         ),
//         tabBarLabel: "朋友"
//       }
//     },
//     Account: {
//       screen: AccountScreen,
//       navigationOptions: {
//         tabBarIcon: ({ focused }) => (
//           <Icon
//             focused={focused}
//             activeSource={require("../image/accountActive.png")}
//             inactiveSource={require("../image/accountInactive.png")}
//             style={styles.HomeNavigator_TarBarIcon}
//           />
//         ),
//         tabBarLabel: "账号"
//       }
//     }
//   },
//   {
//     tabBarOptions: {
//       style: {
//         height: scaleSize(97),
//         backgroundColor: "#1f2526"
//       },
//       labelStyle: {
//         fontSize: px2dp(20),
//         marginBottom: px2dp(9)
//       },
//       activeTintColor: "#d2d3d4",
//       inactiveTintColor: "#878787"
//     }
//   }
// );

const Home = props =>(
    <View>
        <Text>home</Text>
    </View>
)

export default class HomeScreen extends Component {
  
  render() {
    
    return (
        <View 
        style={{
          top:-20,
          flex:1,
        }}
        >
        <Button title='press' onPress={()=>{Actions.push('home_mymusic_songlistDetail')}} />
        <Text>Home</Text>
        </View>
    )
  }
}
