import {useState} from 'react'
import {useRouter} from 'next/router'
import cookie from 'js-cookie'
import {parseCookies} from 'nookies'
import {useToasts} from 'react-toast-notifications'
import { imageupload, postData } from '../utils/dataFetch'


const Register = () => {

    const router = useRouter()
    const { addToast } = useToasts()

    // form states
    const [form, setform] = useState({
        name: '',
        email: '', 
        password: '',
        avatar: '',
        about: ''
    })
    const [Avatar, setavatar] = useState('')
    const handleChange = e => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }




    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const avatar = await imageupload(Avatar)
            const res = await postData('user/register', {...form,avatar})
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
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className="col-lg-6 mx-auto">
                        <div className='my-2'>
                            <label htmlFor="name" 
                            className="form-label">
                                Name
                            </label>
                            <input
                            id='name'
                            name='name'
                            className='form-control'
                            onChange={handleChange}  
                            type="text"  
                            placeholder='name'/>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="email" 
                            className="form-label">
                                Email
                            </label>
                            <input 
                            id='email'
                            name='email'
                            className='form-control'
                            onChange={handleChange}  
                            type="text"  
                            placeholder='email'/>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="password" 
                            className="form-label">
                                Password
                            </label>
                            <input
                            id='password'
                            name='password'
                            className='form-control'
                            onChange={handleChange}  
                            type="text"  
                            placeholder='password'/>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="avatar" 
                            className="form-label">
                                Avatar
                            </label>
                            <input 
                            id='avatar'
                            className='form-control'
                            accept='image/*'
                            onChange={(e) => setavatar(e.target.files[0])}
                            type="file"/>
                            <img className='img-thumbnail  my-2' src={Avatar?URL.createObjectURL(Avatar): ""}/>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="country" 
                            className="form-label">
                                About
                            </label>
                            <input 
                            id='about'
                            name='about'
                            className='form-control'
                            onChange={handleChange}  
                            type="text"  
                            placeholder='about'/>
                        </div>
                        <div className='my-2'>
                            <button 
                            type="submit" 
                            className='form-control btn-outline-info'>
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export const getServerSideProps = async ctx => {
    const {userlogin} = parseCookies(ctx)
    if(userlogin){
        const {res} = ctx
        res.writeHead(302,{Location: '/'})
        res.end()
    }
    return {
        props: {
            
        }
    }
}

export default Register
