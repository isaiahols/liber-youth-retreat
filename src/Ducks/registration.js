let initialState = {
    participant: {
        first_name: '',
        last_name: '',
        birthday: '',
        email: '',
        gender: '',
        photo: '',
        size: '',
        health_card_num: '',
        dietary_concerns: '',
        medical_concerns: '',
        comments: '',
        email_updates: true,
        order_books: true,
        display_profile: true,
    },
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
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        // case TEST_THING:
        //     const { what, val } = payload
        //     let obj = JSON.parse(JSON.stringify(state))
        //     obj.test[what] = val;
        //     return obj
        case UPDATE_USER:
            return Object.assign({}, state, { user: payload })
        case UPDATE_PARTICIPANT:
            const { what, val } = payload;
            newState.participant[what] = val
            return newState;

        default:
            return state;
    }
}



// // // TYPES // // //
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_PARTICIPANT = 'UPDATE_PARTICIPANT'

const TEST_THING = 'TEST_THING';






// // // ACTION CREATORS // // //
export const updateParticipant = (instructions) => {
    // instructions must be {what: input, val: input1}
    return {
        type: UPDATE_PARTICIPANT,
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

export function testerThing(things) {
    return {
        type: TEST_THING,
        payload: {
            what: things[0],
            val: things[1]
        }
    }
}
