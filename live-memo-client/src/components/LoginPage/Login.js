import { Button } from '@mui/material'
import React from 'react'
import { auth, provider } from '../../firebase'
import "./Login.css"
import { login } from "../../features/userSlice"
import { useDispatch } from "react-redux"
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { IconButton } from '@mui/material';

function Login() {
    const dispatch = useDispatch()
    const signIn = () => {
        auth.signInWithPopup(provider).then(({ user }) => {
            dispatch(login({
                displayName: user.displayName,
                email: user.email,
                photoUrl: user.photoURL
            }))
        }).catch(error => alert(error.message))
    }
    return (

        <div className="login" >
            <div className="login__container">

                <Button variant="contained" color="primary" onClick={signIn}>Login</Button>
            </div>
        </div>
    )
}

export default Login
