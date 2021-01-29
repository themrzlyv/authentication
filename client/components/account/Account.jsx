import React from 'react'

// costumer importing
import UserInfo from './UserInfo'
import CreatePost from './CreatePost'
import UserPosts from './UserPosts'

const Account = () => {
    return (
        <div className="container w-75">
            <div className="row">
                <div className='col-lg-8'>
                    <UserInfo />
                </div>
                <div className="col-lg-4">
                    <CreatePost />
                </div>
            </div>
            <div className="row">
                <UserPosts />
            </div>
        </div>
    )
}

export default Account
