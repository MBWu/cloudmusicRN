import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';

import { scaleSize, setSpText, px2dp } from "../fixScreen.js";

//renderItem
//ListHeaderComponent
//ListFooterComponent

export default class UploadingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetched: false,
      fetchError: false,
      data: null,
      uploading: false,
      uploadError: false,
      offset: 0
    };
  }
  componentWillMount = () => {
    
    this._fetchHandle( );
  };
  
  _fetchHandle = ( ) =>{
    
    fetch( this.props.fetchUrl )
    .then(response => response.json())
    .catch(reason => {
      this.setState({
        fetchError: true,
        fetched: true
      });
    })
    .then(json => {

      const dataArr = this.props.dealWithFetchData( json );
      this.setState({
        fetched: true,
        fetchError: false,
        data: dataArr
      });
    });
  }
  
  _uploadFetch = async () => {

    if (this.state.data && !this.state.uploading) {
      console.log(1);
      await this.setState(prevState => ({
        uploading: true,
        uploadError: false,
        offset: prevState.offset + 1
      }));

      fetch(
        `${this.props.fetchUrl}&offset=${this.state
          .offset * 10}`
      )
        .then(response => response.json(), error =>{
          
          this.setState({
            uploadError: true,
            uploading: false
          })
        })
        .then(json => {
            
          if( !this.state.uploadError ){

            const dataArr = this.props.dealWithFetchData( json );
            
            this.setState(prevState => ({
              uploading: false,
              data: [...prevState.data, ...dataArr]
            }));
          }
        });
    }
  };
  _renderListFooterComponent = ()=>{
    let render = null;
    
        if (this.state.uploadError) {
          render = (
            <TouchableOpacity
              onPress = { ()=>{
                this._uploadFetch.bind(this)( );
              } }
            >
              <View
              style={{
                flex: 1,
                height: scaleSize(100),
                justifyContent: "center",
                alignItems: 'center',
                flexDirection: "row"
              }}
            >

              <Text
                style={{
                  color: "#888888"
                }}
              >
                加载失败,点击重新加载
              </Text>
            </View>
            </TouchableOpacity>
          );
        } else if (this.state.uploading) {
          render = (
            <View
              style={{
                flex: 1,
                height: scaleSize(100),
                justifyContent: "center",
                flexDirection: "row"
              }}
            >
              <ActivityIndicator />
              <Text
                style={{
                  lineHeight: scaleSize(100),
                  color: "#888888"
                }}
              >
                {" "}
                加载中{" "}
              </Text>
            </View>
          );
        } else {
          render = (
            <View
              style={{
                flex: 1,
                height: scaleSize(100),
                justifyContent: "center",
                flexDirection: "row"
              }}
            >
              <Text
                style={{
                  lineHeight: scaleSize(100),
                  color: "#888888"
                }}
              >
                {" "}
                上拉加载{" "}
              </Text>
            </View>
          );
        }
    
        return render;
  }
  render() {
    return this.state.fetched ? (
      this.state.fetchError ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff"
          }}
        >
          <Text>Error</Text>
        </View>
      ) : (
        <FlatList
          style={{
            paddingTop: scaleSize(20),
            paddingLeft: scaleSize(20),
            paddingRight: scaleSize(20),
            backgroundColor: "#fff"
          }}
          ListHeaderComponent={
              ( ) =>{
                return this.props.ListHeaderComponent( this.state );
              }
          }
          ListFooterComponent={
              ( ) =>{
                if( this.props.ListFooterComponent ){
                  return this.props.ListFooterComponent();
                }else{
                  return this._renderListFooterComponent.bind(this)();
                }
              }
          }
          onEndReachedThreshold={-0.2}
          onEndReached={
              ( )=>{
                console.log('uploading');
                try {
                  
                }
                finally{

                    this._uploadFetch.bind(this)();
                }
              }
            }
          data={ this.state.data }
          keyExtractor={(item, index) => index}
          renderItem={
            ( props ) =>{

              return this.props.renderItem( props );
            }
          }
        />
      )
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff"
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }
}


// fetch("http://localhost:3000/top/playlist?limit=10")
// .then(response => response.json())
// .catch(reason => {
//   this.setState({
//     fetchError: true
//   });
// })
// .then(json => {
//   const dataArr = this.dealWithFetchData(json.playlists);

//   this.setState({
//     fetched: true,
//     fetchError: false,
//     data: dataArr
//   });
// });


// _uploadFetch = async () => {
//     if (this.state.data && !this.state.uploading) {
//       await this.setState(prevState => ({
//         uploading: true,
//         offset: prevState.offset + 1
//       }));

//       fetch(
//         `http://localhost:3000/top/playlist?limit=10&offset=${this.state
//           .offset * 10}`
//       )
//         .then(response => response.json())
//         .catch(reason => {
//           this.setState({
//             fetchError: true
//           });
//         })
//         .then(json => {
//           const dataArr = this.dealWithFetchData(json.playlists);

//           this.setState(prevState => ({
//             uploading: false,
//             data: [...prevState.data, ...dataArr]
//           }));
//         });
//     }
//   };


// dealWithFetchData = json => {
//     const newarr = [];

//     for (let i = 0; i < json.length; i++) {
//       if (i % 2 === 0) {
//         newarr.push([]);
//       }
//       newarr[newarr.length - 1].push(json[i]);
//     }
//     return newarr;
//   };