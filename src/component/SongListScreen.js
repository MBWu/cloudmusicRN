import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";

import { scaleSize, setSpText, px2dp } from "../fixScreen.js";

import ListItem from "./ListItem.js";
import LoadingComponent from "./LoadingComponent.js";
import UploadingComponent from "./UploadingComponent.js";

export default class SongListScreen extends Component {
  dealWithFetchData = json => {
    const newarr = [];

    for (let i = 0; i < json.playlists.length; i++) {
      if (i % 2 === 0) {
        newarr.push([]);
      }
      newarr[newarr.length - 1].push(json.playlists[i]);
    }
    return newarr;
  };

  render() {
    return (
      <UploadingComponent
        fetchUrl = 'http://localhost:3000/top/playlist?limit=10'
        ListHeaderComponent={() => {
          return (
            <View>
              <Title />
              <PrettySongList />
            </View>
          );
        }}
        dealWithFetchData={this.dealWithFetchData}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            {item.map((value, index) => {
              return (
                <ListItem
                  key={value.id}
                  name={value.name}
                  picUrl={value.coverImgUrl}
                  boxStyle={{
                    width: scaleSize(292),
                    height: scaleSize(354),
                    marginBottom: scaleSize(38)
                  }}
                  coverStyle={{
                    width: scaleSize(290),
                    height: scaleSize(290)
                  }}
                  onPress={() => {
                    Actions.push("home_foundmusic_songlistDetail", {
                      id: value.id,
                      type: 'songlist',
                      name: value.name
                    });
                  }}
                />
              );
            })}
          </View>
        )}
      />
    );
  }
}


const Title = () => (
  <View
    style={{
      height: scaleSize(32),
      marginBottom: scaleSize(29)
    }}
  >
    <Text
      style={{
        left: 0,
        borderColor: "#69ca19",
        borderWidth: scaleSize(3),
        width: 0,
        height: scaleSize(32),
        borderRadius: scaleSize(3)
      }}
    />
    <Text
      style={{ top: scaleSize(-34), left: scaleSize(21), fontSize: px2dp(34) }}
    >
      全部歌单
    </Text>
  </View>
);

class PrettySongList extends Component {
  render() {
    return (
      <View
        style={{
          width: scaleSize(600),
          height: scaleSize(159),
          borderWidth: 1,
          borderColor: "#F3F3F3"
        }}
      >
        <LoadingComponent
          minHeight={scaleSize(159)}
          fetchUrl={"http://localhost:3000/top/playlist/highquality?limit=1"}
        >
          <PrettySongListFetchRender />
        </LoadingComponent>
      </View>
    );
  }
}

const PrettySongListFetchRender = props => (
  <View
    style={{
      height: scaleSize(159),
      flexDirection: "row"
    }}
  >
    {
      //精品歌单跳转按钮的封面
    }
    <Image
      source={{ uri: props.fetchData.playlists[0].coverImgUrl }}
      style={{
        width: scaleSize(160)
      }}
    />

    <View
      style={{
        width: scaleSize(383)
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingLeft: 20
        }}
      >
        <Text
          style={{
            fontSize: px2dp(34),
            paddingLeft: scaleSize(8)
          }}
        >
          <Image
            source={require("../image/prettySonglistIcon.png")}
            style={{
              width: scaleSize(36),
              height: scaleSize(36),
              marginTop: scaleSize(4)
            }}
          />
          精品歌单
        </Text>
        <Text
          style={{
            color: "#888888",
            fontSize: px2dp(18),
            marginTop: scaleSize(20)
          }}
        >
          {props.fetchData.playlists[0].name}
        </Text>
      </View>
    </View>
    <View
      style={{
        width: scaleSize(56)
      }}
    >
      {
        //左箭头
      }
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image
          source={require("../image/arrow_left.png")}
          style={{
            width: scaleSize(19),
            height: scaleSize(32)
          }}
        />
      </View>
    </View>
  </View>
);
