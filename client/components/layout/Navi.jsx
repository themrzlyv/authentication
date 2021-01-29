import Link from 'next/link'
import {useRouter} from 'next/router'
import cookie from 'js-cookie'

//context importing
import {useContext} from 'react'
import {DataContex} from '../../store/GlobalState'
import * as types from '../../store/Actions/types'



const Navi = () => {

    const router = useRouter()

    const {state ,dispatch} = useContext(DataContex)

    const {isLogged} = state

    const handleLogout = () => {
        cookie.remove('userlogin')
        dispatch({type: types.LOGOUT_USER , payload: {}})
        router.push("/")
    }

    const isUser = () => {
        return (
            <>
                <Link href={`/account`}>
                    <a className="nav-link d-flex align-items-center">
                        Profile
                    </a>
                </Link>
                <Link href='/'>
                    <button
                    onClick={handleLogout}
                    className="btn btn-warning">
                        Log Out
                        <i className="fas fa-sign-out-alt mx-1 p-0 "></i>
                    </button> 
                </Link>
            </>
        )
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-info">
                <div className="container w-75">
                    <a className="navbar-brand  px-3 py-0" href="/">Wlog</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {
                                isLogged ?   
                                isUser()
                                :
                                (
                                    <>
                                        <Link href={`/register`}>
                                            <a className="nav-link">
                                                Sign in
                                            </a>
                                        </Link>
                                        <Link href={`/login`}>
                                            <a className="nav-link">
                                                <i className="fas fa-sign-in-alt mx-1 p-0 "></i>
                                                Login
                                            </a>
                                        </Link>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navi
