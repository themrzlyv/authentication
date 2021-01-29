import {useState,useContext} from 'react'
import {DataContex} from '../../store/GlobalState'
import * as types from '../../store/Actions/types'

import {useRouter} from 'next/router'
import cookie from 'js-cookie'
import {imageupload, putData} from '../../utils/dataFetch'

const UserEdit = ({setisEdit}) => {

    const router = useRouter()

    const {state,dispatch} = useContext(DataContex)
    const {auth} = state

    // form states
    const [form, setform] = useState({
        id:auth._id,
        name: auth.name,
        email: auth.email,
        avatar: '',
        about: auth.about
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
        const token = cookie.get("userlogin")
        try {
            if(!token){
                cookie.remove("userlogin")
            }
            const avatar = await imageupload(Avatar)
            const res = await putData('user/update', {...form,avatar}, token)
            dispatch({type:types.GET_USER, payload: res})
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container  my-3'>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className="col-lg-10 mx-auto">
                        <div className='my-2'>
                            <label htmlFor="name" 
                            className="form-label">
                                Name
                            </label>
                            <input
                            id='name'
                            name='name'
                            value={form.name}
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
                            value={form.email}
                            className='form-control'
                            onChange={handleChange}  
                            type="text"  
                            placeholder='email'/>
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
                            <img style={{maxHeight: '10em'}} className='img-thumbnail  my-2' src={Avatar?URL.createObjectURL(Avatar): ""}/>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="about" 
                            className="form-label">
                                About
                            </label>
                            <input 
                            id='about'
                            name='about'
                            value={form.about}
                            className='form-control'
                            onChange={handleChange}  
                            type="text"  
                            placeholder='about'/>
                        </div>
                        <div className='my-2 w-100 d-flex justify-content-between'>
                            <button 
                                onClick={() => setisEdit(false)}
                                className="btn btn-outline-dark">Cancel
                            </button>
                            <button type="submit" className='btn btn-outline-warning'>Update Account</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserEdit
