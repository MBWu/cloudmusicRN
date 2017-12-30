
const initialState = {
    play: false , //是否播放
    duration: 0, //播放歌曲总时长
    currentTime: 0, //播放歌曲当前时长
    volume: 1, //音量
    muted: false, //静音
    repeat: true,//是否重复
    droped: false,//是否已经拖动拖动进度条
    dropValue: null,//拖动后进度条的值
    name: null,
    picUrl: null,
    id: null
}

const musicControlReducer = ( state = initialState , action ) => {

    let nextState;

    switch( action.type ){

        case 'control_changeId':{
            nextState = { ...state, name: action.payload.name, picUrl: action.payload.picUrl, id:action.payload.id };
            break;
        }
        case 'control_play':{
            nextState = { ...state, play: action.payload };
            break;
        }
        case 'control_duration':{
            nextState = { ...state, duration: action.payload };
            break;
        }
        case 'control_currentTime':{
            nextState = { ...state, currentTime: action.payload };
            break;
        }
        case 'control_volume':{
            
            nextState = { ...state, volume: action.payload };
            break;
        }
        case 'control_muted':{

            nextState = { ...state, muted: action.payload };
            break;
        }
        case 'control_repeat':{

            nextState = { ...state, repeat: action.payload };
            break;
        }
        
        case 'control_drop':{
            nextState = { ...state, droped: action.payload.droped , dropValue: action.payload.dropValue };
            break;
        }
        default: {
            break;
        }
    }   

    return nextState || state;
}

export default musicControlReducer;