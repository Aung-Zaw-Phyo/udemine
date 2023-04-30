import React from 'react'
import { Navigate } from 'react-router-dom'
import { getLink } from '../api/helper'

const DetailMiddleware = ({children, detailLink}) => {
    if (!getLink()) {
        return <Navigate to='/' replace></Navigate>
    }
    return children
}

export default DetailMiddleware