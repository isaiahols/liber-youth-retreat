let initialState = {
    participant: {

    },
    user: {},
    emergency: [],
    usersParticipants: []
}

export default (state = initialState, action) => {
    const { payload } = action
    switch (action.type) {
        case UPDATE_USER:
            return Object.assign({}, state, { user: payload })

        default:
            return state;
    }
}


const UPDATE_USER = 'UPDATE_USER';

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}