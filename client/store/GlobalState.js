import { createContext, useReducer, useEffect} from 'react'
import reducers from './Reducers/Reducers'
import cookie from 'js-cookie'

// costumer js importing
import {getData} from '../utils/dataFetch'
import * as types from './Actions/types'


export const DataContex = createContext()



export const DataProvider = ({children}) => {

    const initialState = {
        auth: {},
        isLogged: false
    }

    const [state,dispatch] = useReducer(reducers,initialState)

    
    const token = cookie.get('userlogin')
    
    useEffect(() => {
        if(token){
            const getuserData = async() => {
                const res = await getData('user/info' , token)
                if(res.err){
                    dispatch({type: types.GET_USER, payload: {isLogged: false}})
                    cookie.remove('userlogin')
                }
                dispatch({type: types.GET_USER, payload: res})
            }
            getuserData()
        }
    }, [token])
    
    
    return(
        <DataContex.Provider value={{state, dispatch}}>
            {children}
        </DataContex.Provider>
    )
}

