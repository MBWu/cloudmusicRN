import React , { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

import { scaleSize, setSpText, px2dp } from '../fixScreen.js';

export default class LoadingComponent extends Component{
       
        constructor( props ) {
    
            super( props );
    
            this.state = {
                fetched: false,
                error: false,
                fetchData: null,
            }
        }
        
        componentDidMount() {
    
            this.fetchRcmSongList();
        }

        fetchRcmSongList = () =>{
            
            
            //fetch
            fetch( this.props.fetchUrl )
            .then( response => JSON.parse( response._bodyText ), error => {
                
                this.setState( {
                    fetched: true,
                    error: true,
                } );
            })
            .then( json => {
    
                if( !this.state.error ){
    
                    this.setState( {
    
                        fetched:true,
                        fetchData: json
                    } )
                }
            } )
        }

        // _uploadFetch = async () =>{

        //     if( this.state.uploading === false ){
        //          // update the offset
        //         await this.setState(( prevState) =>{
        //             return {
        //                 uploading: true,
        //                 offset: prevState.offset +1
        //             }
        //         });
                
        //         let fetchUrl = this.props.fetchUrl+'&offset='+(this.state.offset*10);

        //         fetch( fetchUrl )
        //             .then( response => {
        //                 this.props.uploadFinishHandle();
        //                 return response.json();
                        
        //             },error =>{

        //                 this.setState(( prevState )=>{

        //                     return {
        //                         uploading: false,
        //                         offset: prevState-1,
        //                         uploadError: true,
        //                     }
        //                 })
        //                 this.props.uploadFinishHandle();
        //             })
        //             .then( json => {

        //                 if( !this.state.uploadError ){

        //                     this.setState(( prevState )=>{

        //                         return {
        //                             fetchData: {...prevState.fetchData, playlists: [...prevState.fetchData.playlists, ...json.playlists]},
        //                             uploading: false
        //                         }
        //                     });
        //                 }
        //             })
        //     }
           
            
        // }

        render(){
            
            let _children = React.cloneElement( this.props.children,{

                ...this.state
            })
            return (
                <View
                >
                { this.state.fetched ? (
                    
                            <View>
                        
                                {
                                    //error
                                }
                        
                                { this.state.error ? (
                                    <View 
                                        style = { [styles.ContainWrapBox,{alignItems:'center'},this.props.containWrapBox,{minHeight: this.props.minHeight}] }
                                    >
                                        <Text>error</Text>
                                    </View>
                        
                                ) : (

                                    <View 
                                    
                                    style ={ [this.props.containWrapBox ] }
                                    >

                                        {_children}
                                    </View>
                        
                                )
                            }
                        
                            </View>
                        
                        ) : (
                            <View style = { [styles.ContainWrapBox,this.props.containWrapBox,{minHeight: this.props.minHeight} ] } >
                                <ActivityIndicator />
                            </View>
                        
                        )
                    }
                                        
                </View>
            )
        }
    }
    LoadingComponent.propTypes = {
        containWrapBox : PropTypes.object,
        fetchUrl: PropTypes.string.isRequired,
        minHeight: PropTypes.number.isRequired,
    }
    const styles = StyleSheet.create({
        ContainWrapBox:{
            flex:1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
        }
    })