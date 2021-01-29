import {parseCookies} from 'nookies'


// costumer js importing
import SkeletonElement from '../components/Skeleton/SkeletonElement'
import Account from '../components/account/Account'

//contex importing
import {useState , useEffect, useContext} from 'react'
import {DataContex} from '../store/GlobalState'





const account = () => {

    const {state, dispatch} = useContext(DataContex)
    const {auth} = state

    return Object.keys(auth).length === 0  ? <SkeletonElement/> : <Account />
}


export const getServerSideProps = async ctx => {
    const {userlogin} = parseCookies(ctx)
    if(!userlogin){
        const {res} = ctx
        res.writeHead(302,{Location: '/'})
        res.end()
    }

    return {
        props: {
            
        }
    }
}

export default account
