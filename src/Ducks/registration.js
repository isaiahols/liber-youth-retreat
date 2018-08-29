let initialState = {
    participant: {},
    guardian: {},
    emergency: {},
    user: {},
    usersGuardians: [],
    usersEmergency: [],
    usersParticipants: [],
    test: {
        thing: 1,
        stuff: 2
    }
}


// // // REDUCER // // //
export default (state = initialState, action) => {
    const { payload } = action
    switch (action.type) {
        case TEST_THING:
            const { what, val } = payload
            let obj = JSON.parse(JSON.stringify(state))
            obj.test[what] = val;
            return obj
        case UPDATE_USER:
            return Object.assign({}, state, { user: payload })
            
        default:
            return state;
    }
}



// // // TYPES // // //
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_PARTICIPANT = 'UPDATE_PARTICIPANT'

const TEST_THING = 'TEST_THING';






// // // ACTION BUILDERS // // //
export function testerThing(things) {
    return {
        type: TEST_THING,
        payload: {
            what: things[0],
            val: things[1]
        }
    }
}


export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}


