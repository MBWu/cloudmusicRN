

//mode : 0 -- 顺序循环  1 -- 单曲循环  2 -- 随机播放
const initialState = {
    songlist: [],
    mode: 0,
    currentIndex: -1
}

const audioSonglistReducer = ( state = initialState , action ) => {

    let nextState;

    switch( action.type ){

        case 'music_changeMode':
            let mode = state.mode;

            mode++;

            //边界处理
            if( mode > 2){
                mode = 0;
            }

            nextState = { ...state, mode: mode }
            break;

        case 'music_Addall':

        //播放全部
        nextState = { ...state, songlist: action.payload, currentIndex: 0 };
        break;

        case 'music_tapChangeSong':

        //点击歌单列表中的某一首歌播放
        nextState = { ...state, currentIndex: action.payload }
        break;

        case 'music_insert':

            if( state.songlist.length === 0  ){

                
                nextState = { ...state, songlist: [action.payload], currentIndex: 0};
            }else{

                state.songlist.splice( state.currentIndex, 0 , action.payload )
                //插入歌曲到当前位置，currentIndex不变
                
                nextState = { ...state, songlist: [ ...state.songlist ] }
                
            }
            break;

        case 'music_insertNext':

        state.currentIndex === (state.songlist.length -1)?state.songlist.push( ...action.payload ) : state.songlist.splice( state.currentIndex+1, 0 , ...action.payload )
        //判断currentIndex 是否是最后一首歌的指针， 如果是，直接在数组后面添加数据， 如果不是，当作插入
        nextState = { ...state, songlist: [...state.songlist] }
        break; 

        case 'music_delete':
        state.songlist.splice( action.payload, 1 );
        //如果删除的index 在currentIndex 之前， currentIndex向前移动一位
        nextState = { ...state, songlist: [...state.songlist]  , currentIndex: action.payload < state.currentIndex? state.currentIndex-- : state.currentIndex }
        break;

        case 'music_next':

         if( state.mode === 0 ){

            //currentIndex 是 数组最后一个元素的指针 ， 恢复到0 , 否则向后推1
            if( state.currentIndex === state.songlist.length-1 ){
                
                nextState = { ...state, currentIndex: 0 };
            }else {
                nextState = { ...state, currentIndex: state.currentIndex+1};
            }
            break;
            
        }else{

            //随机模式, 产生一个 在 数组长度 范围内的一个整数

            nextState = { ...state , currentIndex: parseInt( Math.random() * (state.songlist.length -1 )) }
            break;

        }
        default: 

            break;
    
    }   

    return nextState || state;
}

export default audioSonglistReducer;