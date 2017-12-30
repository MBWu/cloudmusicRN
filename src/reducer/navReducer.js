// import { NavigationActions } from 'react-navigation';

// import { TopLevelNavigator } from '../navigator/TopLevelNavigator.js';

// let initialState = TopLevelNavigator.router.getStateForAction(

//     TopLevelNavigator.router.getActionForPathAndParams( 'Home' )

// );



// const navReducer = ( state = initialState, action ) => {

//     let nextState;

//     switch( action.type ){

//         case 'nav_songlist':
//             nextState = TopLevelNavigator.router.getStateForAction(
//                 NavigationActions.navigate( {routeName: 'FoundMusicStack_MVPlayer'} ),
//                 state
//             )

//         default:
//             nextState = TopLevelNavigator.router.getStateForAction(

//                 action,
//                 state

//             )
//     }

//     return nextState || state;
// }

// export default navReducer;