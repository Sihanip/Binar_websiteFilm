import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { googleLogin } from '../redux/actions/auth'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { IconButton, Tooltip } from '@mui/material'
import GoogleIcon from "@mui/icons-material/Google";


const GoogleLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            const data = {
              access_token: tokenResponse.access_token
            }
            dispatch(googleLogin(data, navigate))
        }
    })
  return (
    <div>
      <Tooltip placement="right-start" onClick={() => login()}>
        <IconButton>
          <Link to="/">
            <GoogleIcon fontSize="large" color="error" />
          </Link>
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default GoogleLogin