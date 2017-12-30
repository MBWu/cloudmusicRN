import React , { Component } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import ContainerItemTitle from './ContainerItemTitle.js';

import { scaleSize, px2dp } from '../fixScreen.js';

import LoadingComponent from './LoadingComponent.js';
import ListItem from './ListItem.js';


{
    //每一块内容的组件，分别渲染官方榜单和全球榜单
}
class ChildComponent extends Component{
    componentDidMount = ()=>{
        this._fetchDataHandle();
    }
    constructor( props ){

        super( props );

        //如果是 官方榜单 渲染 5个
        if( this.props.type === 'official' ){

            const data = [];

            for( let i = 0; i< 5; i++){

                data.push(
                    {
                        fetched:false,
                        fetchError: false,
                        fetchData: null
                    }
                )
            }

            this.state = {
                data: data
            }
            console.log(this.state.data);
        }else{

            //全球榜单渲染 17 个
            const data = [];

            for( let i = 0; i< 17; i++){
                
                data.push(
                    {
                        fetched:false,
                        fetchError: false,
                        fetchData: null
                    }
                )
            }

            this.state = {
                data: data
            }
            console.log(this.state.data);
        }
        
    }
    _fetchDataHandle(){

        if( this.props.type === 'official' ){

            for( let i =0 ; i< 5; i++ ){
                
                eachFetch.apply( this, [i] );
            }
        }else {

            for( let i =0 ; i< 17; i++ ){
                
                eachFetch.call( this, i);
            }

        }
        
        {
            //每一个榜单的fetch
        }
        function eachFetch ( i ) {

            //官方榜单的idx 0～4
            //全球榜单的 idx 5～21


            let index = i;
            if( this.props.type !== 'official'){
                index = i+5;
            }

            fetch( `http://localhost:3000/top/list?idx=${ index }` )
            .then( response => response.json(), error =>{

                //fetch出错
                const newdata = [...this.state.data];

                newdata[i] = {
                    fetched: true,
                    fetchError: true
                }
                this.setState({
                    data: newdata
                });

            })
            .then( json => {

                //每一次fetch 一个榜单 ，更新以下 this.state.data 的数据
                if( !this.state.data[i].fetchError ){

                    const newdata = [...this.state.data];
                    newdata[i] = {
                        fetched: true,
                        fetchData: json
                    }
                    this.setState({
                        data: newdata
                    })
                }

            })
        }
    }

    _render = ()=>{

        //官方榜单  和  全球榜单 的 item 不一样 ， 分开渲染

        if( this.props.type === 'official' ){

            return this.state.data.map( (value , index ) =>{
                
                    return (
                        <OfficialRanksItem 
                        key={ index } 
                        {...value} /> 
                    )
                            
                    })
        }else {

            return (
                <View
                style = {{
                    flex:1,
                    width: scaleSize( 640 ),
                    flexDirection:'row',
                    flexWrap: 'wrap',
                }}
                >
                    {
                        this.state.data.map( (value , index ) =>{
                            
                            return (
                                <GlobeRanksItem 
                                key={ index } 
                                {...value} /> 
                            )
                                
                        })
                    }
                </View>
            )
        }
    }
    render(){

        return (
            <View
            style ={{
                marginTop: scaleSize( 30 ),
                marginBottom: scaleSize( 30 ),
                minHeight: scaleSize( 291 )
            }}
            >


            { 
                this._render()
            }
            </View>
        )
    }
}



const ContainItems = [
    {
        name: '云音乐官方榜',
        childrenComponent: (
            <ChildComponent type='official' />
        )
    },{
        name: '全球榜',
        childrenComponent: (

            <ChildComponent type='globe' />            
        )
    }
]


export default class RankScreen extends Component {

    render() {

        return (

            <ScrollView
            style={{
                backgroundColor: '#fff',
                paddingLeft: scaleSize( 20 )
            }}
            >
                <View style = { {
                    flex:1,
                    justifyContent:'center'
                } } >
                    {
                        ContainItems.map ( (value, index) =>{
                            console.log(value);
                            return (
                                <ContainItemBox key={index} name={ value.name } childrenComponent = { value.childrenComponent } />
                            )
                        })
                    }
                </View>
            </ScrollView>
            
        )
    }
}


{
    //内容块 盒子
}
const ContainItemBox = props => (
    <View
    style={{
        marginTop: scaleSize( 30 )
    }}
    >
        <ContainerItemTitle name={ props.name } />
        { props.childrenComponent }
    </View>
)

{
    //官方榜单 item
}
class OfficialRanksItem extends Component{

    _renderLoading = ()=>{
        return (
            <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems:'center'
            }}
            >
            <ActivityIndicator />
            </View>
        )
    }
    _renderError = ()=>{
        return (
            <View
            style ={{
                flex:1,
                justifyContent:'center',
                alignItems: 'center'
            }}
            >
                <Text>Error</Text>
            </View>
        )
    }
    _renderFetch = ()=>{


        //由于每一个榜单需要显示前三的歌曲， 用 arr.map（）显然浪费资源，所有用for循环
        const items  = [];
        
        for( let i = 0 ; i< 1; i++){
            const item = ( <Text
                key = { i }
                style={{
                    fontSize: px2dp( 26 ),
                    color: '#666666',
                    height: scaleSize( 30 )
                }}
                > { `${i}. ${this.props.fetchData.result.tracks[i].name} - ${this.props.fetchData.result.tracks[i].artists[0].name}` } </Text> )
            items.push( item );
        }

        return(
           <TouchableOpacity
           activeOpacity = { 0.8 }
           onPress = { () =>{
               
                Actions.push( 'home_foundmusic_ranksDetail', { id: this.props.fetchData.result.id, type: 'rank', name:this.props.fetchData.result.name } )
           } }
           >
            <View
            style = {{
                flexDirection:'row',
                alignItems: 'center'
            }}
            >
                {
                    //榜单封面
                }
                <Image 
                style ={{
                    width: scaleSize( 188 ),
                    height: scaleSize( 188 ),
                }}
                source = {{ 
                    uri: this.props.fetchData.result.coverImgUrl
                }}
                />
                
                {
                    //榜单内容区
                }
                <View
                style={{
                    width: scaleSize( 430 ),
                    height: scaleSize( 200 ),
                    marginLeft: scaleSize( 17 ),
                    borderBottomColor:'#e1e2e3',
                    borderBottomWidth: scaleSize( 1 )
                }}
                >
                    <View
                    style={{
                        flex:1,
                        justifyContent:'space-around'
                    }}
                    >
                        { items }
                        
                    </View>
                </View>
            </View>
           </TouchableOpacity>
            
        )
    }
    render(){

        return (
            <View
            style={{
                height: scaleSize( 200 )
            }}
            >
               { this.props.fetched ? ( this.props.fetchError ? this._renderError() : this._renderFetch() ): this._renderLoading()}
            </View>
        )
    }
}

{
    //全球榜单 item
}

class GlobeRanksItem extends Component{

    _renderLoading = ()=>{
        return (
            <View
            style={{
                width: scaleSize( 190 ),
                height: scaleSize( 268 ),
                marginRight: scaleSize( 16 )
            }}
            >
                <View
                style={{
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center'
                }}
                >
                <ActivityIndicator />
                </View>
            </View>
        )
    }

    _renderError = () =>{

        return (
            <View
            style={{
                width: scaleSize( 190 ),
                height: scaleSize( 268 ),
                marginRight: scaleSize( 16 )
            }}
            >
                <View
                style={{
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center'
                }}
                >
                    <Text>Error</Text>
                </View>
            </View>
        )
    }

    _renderFetch = ()=>{

        return (
            <ListItem
            name = { this.props.fetchData.result.name }
            picUrl = { this.props.fetchData.result.coverImgUrl }
            boxStyle = {{
                marginRight: scaleSize( 16 )
            }}
            onPress = {
                () =>{
                  Actions.push( 'home_foundmusic_ranksDetail', { id: this.props.fetchData.result.id } )
                }
            }
            /> 
        )
    }
    render(){

        return (
            
            this.props.fetched ? ( this.props.fetchError ? this._renderError() : this._renderFetch()) : this._renderLoading()
        )
    }
}