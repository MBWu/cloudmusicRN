import React, { Component } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import Video from "react-native-video";
import { connect } from "react-redux";

import store from "./src/store.js";
import Navigator from "./src/navigator/Navigator.js";

class VideoPlayerUI extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    //拖动后，改变进度
    if (nextProps.control.droped === true) {
      this.video.seek(nextProps.control.dropValue);
      this.props.dispatch({
        type: "control_drop",
        payload: {
          droped: false,
          dropValue: null
        }
      });

      return true;
    }

    // 切换歌曲后，修改id
    if (
      nextProps.audioStore.songlist[nextProps.audioStore.currentIndex].id !==
      this.props.control.id
    ) {
      const song =
        nextProps.audioStore.songlist[nextProps.audioStore.currentIndex];
      this.props.dispatch({
        type: "control_changeId",
        payload: {
          id: song.id,
          name: song.name,
          picUrl: song.al.picUrl
        }
      });
      return true;
    }

    //切换播放
    if (nextProps.control.play !== this.props.control.play) {
      return true;
    }

    //切换播放模式
    if (nextProps.audioStore.mode !== this.props.audioStore.mode) {
      return true;
    }

    return false;
  }

  render() {
    
    return (
      <Video
        ref={video => (this.video = video)}
        playInBackground={true}
        repeat={this.props.audioStore.mode === 1 ? true : false}
        paused={!this.props.control.play}
        source={{
          uri: `http://music.163.com/song/media/outer/url?id=${
            this.props.control.id
          }.mp3`
        }}
        onLoad={data => {
          this.props.dispatch(dispatch => {
            //加载duration
            dispatch({
              type: "control_duration",
              payload: data.duration
            });

            //加载currentTime
            dispatch({
              type: "control_currentTime",
              payload: data.currentTime
            });

            //play = true
            dispatch({
              type: "control_play",
              payload: true
            });
          });
        }}
        
        onProgress={data => {
          //记录currentTime
          this.props.dispatch({
            type: "control_currentTime",
            payload: data.currentTime
          });
        }}
        onEnd={() => {

          //如果不是单曲循环
          if (this.props.audioStore.mode !== 1) {

            this.props.dispatch(dispatch => {
              //停止播放
              dispatch({
                type: "control_play",
                payload: false
              });

              //切换下一曲
              dispatch({
                type: "music_next"
              });
            });
          }
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  control: state.musicControl,
  audioStore: state.audioSonglist
});

const VideoPlayer = connect(mapStateToProps)(VideoPlayerUI);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View
          style={{
            flex: 1
          }}
        >
          <Navigator />
          <VideoPlayer />
        </View>
      </Provider>
    );
  }
}
