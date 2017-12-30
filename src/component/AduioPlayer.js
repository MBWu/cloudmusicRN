import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  Animated,
  Easing,
  Button,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Modal,
  FlatList
} from "react-native";
import { BlurView, VibrancyView } from "react-native-blur";
import { connect } from "react-redux";
import Video from "react-native-video";

import store from "../store.js";

import { scaleSize, px2dp } from "../fixScreen.js";

class AduioPlayerScreen extends Component {

  static navigationOptions = (props)=>{

    console.log(props);
  }

  constructor(props) {
    super(props);
    
    this.state = {
      droping: false,
      coverRotate: new Animated.Value(0), //封面旋转
      modalVisible: false, //songlist modal 是否显示
      processSiteX: 0, //进度条的位置
      processWidth: 0, //进度条的宽度
      dotMaxLeft: null //圆点最大的left
    };
  }
  componentDidMount(){

    this.props.navigation.setParams({
      'name': this.props.control.name
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.control.play !== prevProps.control.play ||
      this.state.droping !== prevState.droping
    ) {
      this.setAnimation();
    }
  }

  //旋转动画
  setAnimation = () => {
    //animation 设置
    const rotateAnimation = Animated.timing(this.state.coverRotate, {
      toValue: 1, // 目标值
      duration: 6000, //60FPS
      easing: Easing.linear
    });

    //监听coverRotate value的变化，实现循环
    this.state.coverRotate.addListener(async ({ value }) => {
      if (value === 1) {
        await this.state.coverRotate.setValue(0);
        rotateAnimation.start();
      }
    });

    //根据歌曲的播放控制图片旋转
    if (this.state.droping) {
      //如果在拖动， 无论是否在播放，都停止旋转动画
      rotateAnimation.stop();
    } else {
      if (this.props.control.play ) {
        rotateAnimation.start();
      } else {
        rotateAnimation.stop();
      }
    }
  };

  //模糊背景
  _renderBlur = () => {
    return (
      <ImageBackground
        source={
          {
            uri: this.props.control.picUrl ? this.props.control.picUrl : '#'
          }
        }
        style={{
          position: "absolute",
          flex: 1,
          width: Dimensions.get("window").width,
          height: scaleSize(863)
        }}
      >
        <VibrancyView
          blurType="dark"
          style={{
            flex: 1
          }}
          blurAmount={25}
        />
      </ImageBackground>
    );
  };

  _renderMode = ( width , height ) => {
    let iconUrl;

    const _onPress = () => {
      this.props.dispatch({
        type: "music_changeMode"
      });
    };

    if (this.props.aduioStore.mode === 0) {
      iconUrl = require("../image/order-loop.png");
    } else if (this.props.aduioStore.mode === 1) {
      iconUrl = require("../image/single-loop.png");
    } else {
      iconUrl = require("../image/randomPlaymode.png");
    }

    return (
      <TouchableWithoutFeedback
      underlayColor = 'rgba(0,0,0,0.5)'
      onPress={_onPress.bind(this)}>
        <Image
          style={{
            width: width,
            height: height
          }}
          source={iconUrl}
        />
      </TouchableWithoutFeedback>
    );
  };

  //控制播放器
  _renderControl = () => {

    const currentTime = this.props.control.currentTime;
    const duration  = this.props.control.duration;

    const renderTime = (
      <View
        style={{
          height: scaleSize(24)
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          {
            //currentTime
          }
          <Text
            style={{
              fontSize: px2dp(24),
              color: "#333333",
              fontWeight: "500"
            }}
          >
          {`${ currentTime < 600 ? '0'+Math.floor( currentTime / 60 ) : Math.floor( currentTime / 60 ) }:${ currentTime % 60 < 10 ? '0'+ parseInt( currentTime % 60 ) : parseInt( currentTime % 60 ) } `}
          </Text>

          {
            //duration
          }
          <Text
            style={{
              fontSize: px2dp(24),
              color: "#BCBDBF",
              fontWeight: "500"
            }}
          >
            / {`${ duration < 600 ? '0'+Math.floor( duration / 60 ) : Math.floor( duration / 60 ) }:${ duration % 60 < 10 ? '0'+ parseInt( duration % 60 ) : parseInt( duration % 60 ) } `}
            
          </Text>
        </View>
      </View>
    );

    {
      //进度条
    }
    const Process = () => {
      return (
        <View
          style={{
            width: scaleSize(426),
            height: scaleSize(76),
            borderColor: "#d7d8dc",
            borderWidth: scaleSize(6),
            backgroundColor: "#e9eef1",
            borderRadius: scaleSize(34),
            position: "relative",
            overflow: "hidden"
          }}
          onLayout={({ nativeEvent }) => {
            this.setState({
              processSiteX: nativeEvent.layout.x + scaleSize(6), //进度条的left + 左border
              processWidth: nativeEvent.layout.width - scaleSize(6) * 2, // 进度条的宽度 - 左右两边border = 进度条的containWidth
              dotMaxLeft:
                nativeEvent.layout.width - scaleSize(6) * 2 - scaleSize(64) //进度条的宽度 - 两边border宽度 -  圆点本身的宽度 = 圆点可运动的范围
            });
          }}
        >
          {
            //currentProcess
          }
          <View
            style={{
              overflow: "hidden"
            }}
          >
            <View
              style={{
                height: scaleSize(64),
                width:
                  this.props.control.currentTime /
                  this.props.control.duration *
                  this.state.processWidth, //百分比 * 总长度
                borderTopLeftRadius: scaleSize(32),
                borderBottomLeftRadius: scaleSize(32),
                backgroundColor: "#69ca19",
                borderTopRightRadius:
                  this.props.control.currentTime/this.props.control.duration > 0.5
                    ? scaleSize(32)
                    : null, //为了美观
                borderBottomRightRadius:
                this.props.control.currentTime/this.props.control.duration > 0.5
                    ? scaleSize(32)
                    : null //为了美观
              }}
            />
          </View>

          {
            //圆点
          }

          <TouchableWithoutFeedback
          onPress={() => {
            
            if( this.props.control.play ){

              this.props.dispatch({
                type: 'control_play',
                payload: false
              })
            }else {

              this.props.dispatch({
                type: 'control_play',
                payload: true
              })
            }
          }}
        >
            <View
              style={{
                width: scaleSize(64),
                height: scaleSize(64),
                position: "absolute",
                left: this.props.control.currentTime / this.props.control.duration * this.state.dotMaxLeft, //时间百分比 * 圆点最大运动距离
                top: 0,
                backgroundColor: "#fff",
                borderRadius: scaleSize(32)
              }}
              onTouchStart={() => {
                //停止播放以及停止旋转动画 ， 否则旋转动画会变慢
                
                this.setState({
                  droping: true
                })
              }}
              //拖动进度条
              onTouchMove={({ nativeEvent }) => {
                  //滑动距离
                  let _dotLeft =
                  nativeEvent.changedTouches[0].pageX -
                  this.state.processSiteX;

                  // 边界处理
                  if (_dotLeft > this.state.dotMaxLeft) {
                    _dotLeft = this.state.dotMaxLeft;
                  } else if (_dotLeft < 0) {
                    _dotLeft = 0;
                  }

                this.props.dispatch({
                  type: 'control_drop',
                  payload: {
                    droped: true,
                    dropValue: _dotLeft/ this.state.dotMaxLeft * this.props.control.duration
                  }
                });

              }}
              onTouchEnd={() => {
                
                this.setState({
                  droping: false
                })

              }}
            >
              {
                //layout obx
              }
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
              
                <Image
                  style={{
                    width: scaleSize(25),
                    height: scaleSize(30)
                  }}
                  source={
                    this.props.control.play
                      ? require("../image/pause.png")
                      : require("../image/play2.png")
                  }
                />
          
              </View>
            </View>
            </TouchableWithoutFeedback>
            
        </View>
      );
    };

    {
      //点击显示歌单modal
    }
    const ShowSonglist = () => (
      <TouchableWithoutFeedback
        onPress={() => {
          //press  modal显示

          this.setState(prevState => ({
            modalVisible: true
          }));
        }}
      >
        <Image
          source={require("../image/showSonglist.png")}
          style={{
            width: scaleSize(44),
            height: scaleSize(41)
          }}
        />
      </TouchableWithoutFeedback>
    );

    return (
      <View
        style={{
          flex: 1
        }}
      >
        {
          //size box
        }
        <View
          style={{
            height: scaleSize(146),
            backgroundColor: "#E2E3E7",
            top: scaleSize(863),
            left: 0
          }}
        >
          {
            //layout box
          }

          <View
            style={{
              flex: 1,
              justifyContent: "space-around"
            }}
          >
            {
              //time
            }
            {renderTime}

            <View
              style={{
                height: scaleSize(76)
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center"
                }}
              >
                {
                  //select mode
                }
                { this._renderMode( scaleSize(41), scaleSize(41) ) }

                {
                  //process
                }
                {Process()}

                {
                  //show songlist
                }
                {ShowSonglist()}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  //旋转封面
  _renderCover = () => {
    return (
      <Animated.Image
        source={
          {
            uri: this.props.control.picUrl ? this.props.control.picUrl : '#'
          }
        }
        style={{
          width: scaleSize(302),
          height: scaleSize(302),
          borderRadius: scaleSize(302) / 2,
          top: scaleSize(220),
          left: scaleSize(173),
          transform: [
            {
              rotate: this.state.coverRotate.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"]
              })
            }
          ]
        }}
      />
    );
  };

  

  //songlist modal
  _renderSonglist = () => {

    const BlackBackground = () => {
      const _onPress = () => {
        this.setState({
          modalVisible: false
        });
      };
      return (
        <TouchableWithoutFeedback
          onPress={_onPress}
          style={{
            position: "absolute",
            top: 0,
            left: 0
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              flex: 1
            }}
          />
        </TouchableWithoutFeedback>
      );
    };

    const SonglistContain = () => {

      const HeaderComponent = () =>{

        return (
          <View
          style ={{
            height:scaleSize( 100 ),
            borderBottomColor: '#B8B8B8',
            borderBottomWidth: 1
          }}
          >
            <View
            style={{
              flex:1,
              flexDirection:'row',
            }}
            >
              <View
              style= {{
                flex:1,
                height: scaleSize( 100 ),
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: scaleSize( 22 )
              }}
              >
                {
                  //mode
                }
                {this._renderMode( scaleSize( 40 ), scaleSize( 33 ))}

                <Text
                style ={{
                  marginLeft: scaleSize( 10 ),
                  fontSize: px2dp( 30 ),
                  color: '#333333'
                }}
                >
                  { this.props.aduioStore.mode === 0 ? `顺序循环(${this.props.aduioStore.songlist.length})` : ( this.props.aduioStore.mode === 1? `单曲循环(${this.props.aduioStore.songlist.length})` : `随机播放(${this.props.aduioStore.songlist.length})` ) }
                </Text>
              </View>

              {
                //清空
              }
              <View
              style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'flex-end',
                height: scaleSize( 100 )
              }}
              >
                <View>
                  <TouchableWithoutFeedback>
                    <View
                    style ={{
                      flex:1,
                      flexDirection:'row',
                      alignItems: 'center'
                    }}
                    >
                      <Image 
                      source = {
                        require('../image/trash.png')
                      }
                      style = {{
                        width: scaleSize( 33 ),
                        height: scaleSize( 34 )
                      }}
                      />
                      <Text
                      style = {{
                        fontSize: px2dp( 30 ),
                        color: '#373737',
                        paddingLeft: scaleSize( 17 ),
                        paddingRight: scaleSize( 20 )
                      }}
                      >
                        清空
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </View>
        )
      }

      const BottomComponent = ()=>(
        <TouchableWithoutFeedback
          onPress = {
            ()=>{

              this.setState({
                modalVisible: false
              })
            }
          }
        >
          <View
          style = {{
            height: scaleSize( 110 ),
            borderTopColor: '#D3D4D5',
            borderTopWidth: 1
          }}
          >
            <View
            style={{
              flex:1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            >
              <Text
              style={{
                fontSize: px2dp( 34 ),
                color:'#333333'
              }}
              >
                关闭
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )


      {
        //单曲信息
      }
      const _renderItem = ({item, index})=>{

        return (
            <TouchableWithoutFeedback
            onPress = {
              ()=>{

                //点击切换歌单歌曲
                this.props.dispatch(
                  {
                  type: 'music_tapChangeSong',
                  payload: index
                  }
                )

              }
            }
            >
            
                <View
                style={{
                  height: scaleSize( 89 ),
                  marginLeft: scaleSize( 20 ),
                  borderBottomColor: '#B4B4B4',
                  borderBottomWidth: 1
                }}
              >
              {
                //layout box
              }
                <View
                style = {{
                  flex:1,
                  flexDirection: 'row',
                }}
                >

                  {
                    //歌曲信息
                  }
                  <View
                  style = {{
                    width: scaleSize( 470 ),
                    height: scaleSize( 89 ),
                    overflow: 'hidden'
                  }}
                  > 

                    <View
                    style = {{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                    >

                    {
                      //喇叭图案
                    }
                      {
                        this.props.aduioStore.currentIndex === index ? 
                        (
                          <Image 
                          source = {
                            require('../image/volume.png')
                          }
                          style = {{
                            width: scaleSize( 32 ),
                            height: scaleSize( 32 ),
                            marginRight: scaleSize( 14 )
                          }}
                          />
                        ):
                        (
                          null
                        )
                      }
                      <Text
                      style = {{
                        fontSize: px2dp( 32 ),
                        color: this.props.aduioStore.currentIndex === index ? '#6EBE3F' : '#333333'
                      }}
                      >
                        { item.name }
                        -
                        { item.ar[0].name }
                      </Text>
                    </View>
                  </View>


                  {
                    //删除操作
                  }
                  
                  <View
                    style = {{
                      flex:1,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}
                  >

                    <Text
                    
                    style = {{
                      fontSize: px2dp( 44 ),
                      color: '#A1A1A1',
                      paddingRight: scaleSize( 36 ),
                    }}
                    >
                      x
                    </Text>
                  </View>
                    
                </View>
              </View>
            
            </TouchableWithoutFeedback>
        )
      }

      return (
        <BlurView
          blurType="xlight"
          blurAmount={30}
          style={{
            height: scaleSize(710),
            position: "relative"
          }}
        >
          { HeaderComponent() }
          <FlatList 
          
          data = { this.props.aduioStore.songlist }
          renderItem = { 
            _renderItem
           }
          keyExtractor = { (item, index) =>{
            return index
          } }
          />
          { BottomComponent() }
        </BlurView>
      );
    };

    return (
      <Modal
        visible={this.state.modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            position: "relative"
          }}
        >
          {
            //黑色背景
          }
          {BlackBackground()}

          {SonglistContain()}
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <View>
        {
          //模糊背景
        }
        {this._renderBlur()}

        {
          //音乐控制器
        }

        {this._renderControl()}

        {
          //封面
        }
        {this._renderCover()}

        {
          //songlist modal
        }
        { this._renderSonglist() }

        
      </View>
    );
  }
}

const mapStateToProps = state => ({
  aduioStore: state.audioSonglist,
  control: state.musicControl
});

export default connect(mapStateToProps)(AduioPlayerScreen);
