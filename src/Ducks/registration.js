const initialState = require('./initialState');



// // // REDUCER // // //
export default (state = initialState, action) => {
    const { payload } = action
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case UPDATE_USER:
            return Object.assign({}, state, { user: payload })
        case UPDATE_NESTED_OBJECT:
            const {where, what, val } = payload;
            newState[where][what] = val
            return newState;

        default:
            return state;
    }
}



// // // TYPES // // //
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_NESTED_OBJECT = 'UPDATE_NESTED_OBJECT'

const TEST_THING = 'TEST_THING';






// // // ACTION CREATORS // // //
export const updateNestedObject = (instructions) => {
    // instructions must be {what: input, val: input1}
    return {
        type: UPDATE_NESTED_OBJECT,
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




// testing //
