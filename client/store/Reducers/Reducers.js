import * as types from '../Actions/types'

const reducers = (state,action) => {
    switch (action.type) {
        case types.GET_USER:
            const auth = action.payload
            return {
                ...state,
                auth,
                isLogged:true
            }
        case types.LOGOUT_USER:
            return {
                ...state,
                auth: {},
                isLogged:false
            }

        default:
            return state;
    }
}

export default reducers