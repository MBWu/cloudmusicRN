import React , { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

// import { scaleSize, setSpText, px2dp } from '../fixScreen.js';


export default class Swiper extends Component{
    
    _sharePropsToChild = () =>{
        
        let that = this;

        this._children = this.props.children.map( ( value, index )=>{

            return React.cloneElement( value,{
                style: {
                    ...value.props.style,
                    width: this.props.width || Dimensions.get('window').width,
                    height: that.props.height
                },
                key: index
            })
        })

    }
    
    _scrollEndDrag = ( nativeEvent ) =>{
        let { contentOffset, velocity } = nativeEvent;
        
        //the screen number , the swiper container width or height
        let num , containerWidth, containerHeight;

        const caculateCurrentScreenNumber = () =>{

            const velocityRadio = this.props.speed || 0.5;
            if( this.props.horizontal ){

                containerWidth = this.props.width || Dimensions.get('window').width;
                num = Math.round( (contentOffset.x + (velocity.x * velocityRadio * 200))/ containerWidth );
            }else {

                containerHeight =  this.props.height ;
                num = Math.round( (contentOffset.y + (velocity.y * velocityRadio * 200))/ containerHeight );
            }
        }

        
        const dealWithBoundary = () =>{

            if( num < 0 ){
                
                num = 0;
            }else if( num > (this.props.children.length-1)){
    
                num = this.props.children.length-1;
            }
        }
        
        caculateCurrentScreenNumber();
        dealWithBoundary();
        if( this.props.horizontal ){

            _scrollView.scrollTo({
                x: num * containerWidth 
            });
        }else {

            _scrollView.scrollTo({
                y: num * containerHeight
            })
        }
        
    }

    render(){
        
        this._sharePropsToChild();

        return (
            <View 
            
            style = {[
                {
                width: this.props.width || Dimensions.get('window').width,
                height: this.props.height ,
                }
            ] }

            >
            
            <ScrollView 

            ref={(scrollView) => { _scrollView = scrollView; }}
            scrollEnabled={ 
               this.props.type === 'scroll' ? true : false
             } 
            horizontal = { 
                this.props.type === 'scroll' && this.props.horizontal === true ? true : false
             } 
            showsHorizontalScrollIndicator={false} 
            showsVerticalScrollIndicator={false}
            onScrollEndDrag = {
                ({nativeEvent})=>{

                    //only scroll mode can use this function
                    if( this.props.type === 'scroll' ){

                        this._scrollEndDrag( nativeEvent );
                    }
                }
            }
            
            >
            {this._children}
            </ScrollView>

            </View>
        )
    }
}

Swiper.propTypes = {

    width: PropTypes.number,
    height: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    animated: PropTypes.bool,
    speed: PropTypes.number

}