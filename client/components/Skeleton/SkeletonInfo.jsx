import React from 'react'
import SkeletonElement from './SkeletonElement'
import styles from './SkeletonInfo.module.scss'

const SkeletonInfo = () => {
    return (
        <div className={`${styles.skeletonWrapper}`}>
            <div className={`${styles.skeletonProfile} container`}>
                <div className="row">
                    <div className="col-md-4 ">
                        <SkeletonElement type='avatar'/>
                    </div>
                    <div className="col-md-8 d-flex flex-column justify-content-evenly align-items-end">
                        <SkeletonElement type='name'/>
                        <SkeletonElement type='email'/>
                        <SkeletonElement type='contact'/>
                        <SkeletonElement type='description'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonInfo
