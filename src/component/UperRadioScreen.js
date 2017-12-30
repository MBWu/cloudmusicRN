import React , { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { scaleSize, px2dp } from '../fixScreen.js';

import Swiper from './Swiper.js';
import ContainerItemTitle from './ContainerItemTitle.js';
import LoadingComponent from './LoadingComponent.js';
import StripListItem from './StripListItem.js';
import ListItem from './ListItem.js';

{
    //精彩节目推荐
}
class GoodProgram extends Component {
    
        render(){
    
            return (
                <View
               
                >
                { this.props.fetchData.result.map( (value, index ) =>{
                    
                    return (
                        <StripListItem name={ value.program.mainSong.name } des={ value.copywriter } key={ value.id } imageUrl={ value.picUrl } /> 
                    )
                 }) }
                </View>
            )
        }
    }

{
    //精选电台
}
class GoodRadio extends Component{

    render(){

        return (
            <View>
                <View
                style = {{
                    flex:1,
                    flexDirection:'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                }}
                >
                    { this.props.fetchData.djRadios.map( (value, index ) =>{

                        if( index<6){
                            return (
                                <ListItem key={index} name = { value.rcmdtext } picUrl = { value.picUrl }
                                onPress = { ()=>{
                                    Actions.push( 'home_foundmusic_radioDetail', { id: value.id } )
                                } }
                                />
                            )
                        }
                    }) }
                </View>
            </View>
        )
    }
}

const ContainerItems =  [
    {
        name: '精彩节目推荐',
        childrenComponent: (

            <LoadingComponent
            fetchUrl = 'http://localhost:3000/personalized/djprogram'
            containWrapBox = {{
                marginTop: scaleSize( 30 ),
                marginBottom: scaleSize( 80 ),
            }}
            minHeight = { scaleSize( 291 ) }
            >
                <GoodProgram /> 
            </LoadingComponent>
        )
    },{
        name: '精选电台 - 订阅更精彩',
        childrenComponent: (

            <LoadingComponent
            fetchUrl = 'http://localhost:3000/dj/recommend'
            containWrapBox = {{
                marginTop: scaleSize( 30 ),
                marginBottom: scaleSize( 70 ),
            }}
            minHeight = { scaleSize( 291 ) }
            >
                <GoodRadio /> 
            </LoadingComponent>
        )
    },{
        name: '热门电台',
        childrenComponent: (

            <View
            style={{
                height: scaleSize( 291 )
            }}
            >
                <View
                style = {{
                    flex:1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                >
                    <Text 
                    style ={{
                        color: '#888'
                    }}
                    >
                    没有对应的Api
                    </Text>
                </View>
            </View>
        )
    }
]

export default class UperRadioScreen extends Component {

    render() {

        return (

            <ScrollView style = { {
                flex:1,
                backgroundColor: '#fff',
                paddingLeft: scaleSize( 12 ),
                paddingRight: scaleSize( 12 ),
            } } >
               
                <View
                style= {{
                    flex:1,
                }}
                >
                    <RadioClassWrapBox />
                    <RadioRanks />
                    {
                        ContainerItems.map( (value, index ) =>{

                            return (
                                <ContainerItem key={ index } name = { value.name } childrenComponent = { value.childrenComponent }  />
                            )
                        })
                    }
                </View>
            </ScrollView>
        )
    }
}

{
    //电台种类
}
class RadioClassWrapBox extends Component{

    render(){

        return (

            <LoadingComponent
            fetchUrl = 'http://localhost:3000/dj/catelist'
            minHeight = { scaleSize( 320 ) }
            >
                <RadioClass /> 
            </LoadingComponent>
        )
    }
}

class RadioClass extends Component{

    constructor( props ){

        super( props );
        this.state = {
            radioClassData: this._dealWithRadioClassData()
        }
    }
    _dealWithRadioClassData = ( )=>{

        const newarr = [];
        const len = this.props.fetchData.categories.length;
        for( let i = 0; i< len ; i++){

            if( i % 8 === 0){
                newarr.push([]);
            }

            newarr[newarr.length-1].push(this.props.fetchData.categories[i]);
        }

        return newarr;

    }

    render(){

        return (
            <Swiper
            
            width = { scaleSize( 616 ) }
            height = { scaleSize( 320 ) }
            type = { 'scroll' }
            horizontal = { true }
        >

            { this.state.radioClassData.map( (value , index )=>{

                return (
                    <View
                    key = { index }
                    style = {{
                    }}
                    >
                        <View
                        style = {{
                            flex:1,
                            flexDirection:'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            height:  scaleSize( 320 )
                        }}
                        >
                            { value.map ( (value , index ) =>{

                                return <RadioClassPage key = { index } name = { value.name } id = { value.id } imageUrl = { value.pic56x56Url }  />
                            } ) }           
                        </View>
                    </View>
                )
            }) }
        </Swiper>
        )
    }
}


{
    //电台种类页
}
const RadioClassPage = props => (
    <TouchableOpacity
        activeOpacity = { 0.8 }
        onPress = { ()=>{

            Actions.push( 'home_foundmusic_radioCategoryDetail', {name: props.name, id: props.id } )
        } }
    >
    <View
        style = {{
            width: scaleSize( 135 ),
            height: scaleSize( 90 ),
            marginTop: scaleSize( 34 )
        }}
    >
        <View
        style = {{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        }}
        >   
            <Image
                source = {{uri: props.imageUrl }}
                style = {{
                    width: scaleSize( 56 ),
                    height: scaleSize( 56 )
                }}
            />
            <Text
            style={{
                fontSize: px2dp( 24 ),
                color: '#727272'
            }}
            > { props.name } </Text>
        </View>
    </View>
    </TouchableOpacity>
    
)

{
    //电台排行榜
}
class RadioRanks extends Component{

    render(){

        return (

            <View
            
            style = {{
                width: scaleSize( 616 ),
                height: scaleSize( 158 ),
                justifyContent:'center',
                alignItems:'center',
                borderWidth: 1,
                borderColor: '#d6d7d8',
                marginBottom: scaleSize( 60 )
            }}
            >
                <Text
                style = {{
                    color:'#888'
                }}
                >
                    没有对应的Api
                </Text>

            </View>
        )
    }
}

const radioRanksStyles = StyleSheet.create({

    box: {
        
    }
})

{
    //该页主要内容的Item
}
class ContainerItem extends Component{

    render(){

        return (

            <View
            
            style = {{
                backgroundColor: '#fff'
            }}
            >
                <ContainerItemTitle name= { this.props.name } />
                { this.props.childrenComponent }
            </View>
        )
    }
}

