const initialState = require('./initialState');
const axios = require('axios');



// // // REDUCER // // //
export default (state = initialState, action) => {
    const { payload, type } = action

    let newState = JSON.parse(JSON.stringify(state))
    switch (type) {
        case UPDATE_USER:
            return Object.assign({}, state, { user: payload })
        case UPDATE_NESTED_OBJECT:
            const { where, what, val } = payload;
            newState[where][what] = val
            return newState;
        case UPDATE_OBJECT_iN_STATE:
            const { which, content } = payload;
            newState[which] = [...state.usersParticipants, content[0]]
            return newState;
        case GET_PARTICIPANT_FULFILLED:
            newState.usersParticipants = payload.data;
            return newState;
        case GET_GUARDIAN_FULFILLED:
            newState.usersGuardians = payload.data
            return newState;
        case GET_EMERGENCY_FULFILLED:
            newState.usersEmergency = payload.data
            return newState;


        case RESET_STATE:
            newState = payload
            return newState;
        default:
            return state;
    }
}



// // // TYPES // // //
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_NESTED_OBJECT = 'UPDATE_NESTED_OBJECT';
const UPDATE_OBJECT_iN_STATE = 'UPDATE_OBJECT_iN_STATE';
const GET_PARTICIPANT = 'GET_PARTICIPANT';
const GET_PARTICIPANT_FULFILLED = 'GET_PARTICIPANT_FULFILLED';
const GET_GUARDIAN = 'GET_GUARDIAN';
const GET_GUARDIAN_FULFILLED = 'GET_GUARDIAN_FULFILLED';
const GET_EMERGENCY = 'GET_EMERGENCY';
const GET_EMERGENCY_FULFILLED = 'GET_EMERGENCY_FULFILLED';

const RESET_STATE = 'RESET_STATE'






// // // ACTION CREATORS // // //
export const updateNestedObject = (instructions) => {
    // instructions must be {where: input, what: input1, val: input2}
    return {
        type: UPDATE_NESTED_OBJECT,
        payload: instructions
    }
}

export const updateObjectOnState = (instructions) => {
    return {
        type: UPDATE_OBJECT_iN_STATE,
        payload: instructions
    }
}

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

// // // Action Functions // // //
export const getParticipants = (url) => {
    return {
        type: GET_PARTICIPANT,
        payload: axios.get(url)
    }
}
export const getGuardian = (url) => {
    return {
        type: GET_GUARDIAN,
        payload: axios.get(url)
    }
}
export const getEmergency = (url) => {
    return {
        type: GET_EMERGENCY,
        payload: axios.get(url)
    }
}



// testing //

// export const resetState = (test) => {
//     if(test === 'reset me please') {
//         return {
//             type: RESET_STATE,
//             payload: initialState
//         } 
//     }
// }

