import {useContext, useState} from 'react'
import {DataContex} from '../../store/GlobalState'
import SkeletonInfo from '../Skeleton/SkeletonInfo'
import UserEdit from './UserEdit'

const UserInfo = () => {
    const {state, dispatch} = useContext(DataContex)
    const {auth} = state

    const [isEdit, setisEdit] = useState(false)

    return (
        <div className="card my-3" >
            <div className="row g-0">
                {
                    Object.keys(auth).length === 0 && <SkeletonInfo />
                }
                {
                    !isEdit ? 
                    (
                        <>
                            <div className="col-md-4">
                                <img 
                                style={{maxWidth:'100%'}}
                                className='img-thumbnail' 
                                src={auth.avatar} 
                                alt="profile-pic" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body d-flex flex-column align-items-end">
                                    <h5 className="card-title">{auth.name}</h5>
                                    <h6 className="card-title">{auth.email}</h6>
                                    <p className="card-text">{auth.about}</p>
                                    <button 
                                    onClick={() => setisEdit(!isEdit)}
                                    className="btn btn-outline-warning">Edit Account</button>
                                </div>
                            </div>
                        </>
                    )
                    :
                    <UserEdit setisEdit={setisEdit} />
                }
                
            </div>
        </div>
    )
}

export default UserInfo
