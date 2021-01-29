import {useState} from 'react'
import {useRouter} from 'next/router'
import cookie from 'js-cookie'
import {useToasts} from 'react-toast-notifications'
import { postData } from '../utils/dataFetch'


const Login = () => {

    const router = useRouter()

    const { addToast } = useToasts()

    const [form, setform] = useState({email: '' , password: ''})
    const handleChange = e => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async e=> {
        e.preventDefault()
        try {
            const res = await postData("user/login",form)
            if(res.accesstoken){
                cookie.set("userlogin",res.accesstoken)
                router.push("/account")
            } else {
                return addToast(res.err , {appearance:"error"})
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container border my-3'>
            <div className="row">
                <div className="col-lg-6 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className='my-2'>
                            <label
                            className="form-label" 
                            htmlFor="email">
                                Email
                            </label>
                            <input 
                            className='form-control'
                            id='email'
                            onChange={handleChange} 
                            type="text" 
                            name='email' 
                            placeholder='email'/>
                        </div>
                        <div className="my-2">
                            <label
                            className="form-label" 
                            htmlFor="password">
                                Password
                            </label>
                            <input 
                            className='form-control'
                            id='password'
                            onChange={handleChange} 
                            type="text" 
                            name='password' 
                            placeholder='password'/>
                        </div>
                        <div className='my-3'>
                            <input type="submit" className='form-control btn-outline-info' value="Login"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
