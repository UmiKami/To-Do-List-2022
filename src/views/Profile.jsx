import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const navigate = useNavigate()

  useEffect(()=>{
    !isLoggedIn && navigate("/")
  }, [isLoggedIn, navigate])

  return (
    <div>Profile</div>
  )
}

export default Profile