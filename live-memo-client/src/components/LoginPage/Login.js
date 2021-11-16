import { Button } from '@mui/material'
import React from 'react'
import { auth, provider } from '../../firebase'
import "./Login.css"
import { login } from "../../features/userSlice"
import { useDispatch } from "react-redux"
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { IconButton } from '@mui/material';

function Login() {
    const api = axios.create({
        baseURL: 'http://localhost:5000/api/user',
        headers: { 'Content-Type': 'application/json',
              'authorization' : token ? `Bearer ${token}` : '' }
    });
    const dispatch = useDispatch()
    // const signIn = () => {
    //     auth.signInWithPopup(provider).then(({ user }) => {
    //         dispatch(login({
    //             displayName: user.displayName,
    //             email: user.email,
    //             photoUrl: user.photoURL
    //         }))
    //     }).catch(error => alert(error.message))
    // }

    const signIn = async(dispatch) => {
        try {
            // dispatch({ type: "LOGIN_REQUEST"});
            const res = await api.get('/auth/google')
            if (res.status === 200) {
                const { token } = res.data;
                localStorage.setItem('livememo-token', token);
                // dispatch({ type: "LOGIN_SUCCESS",
                //         payload: {id, nickname, profileImg110, provider} });
            }
        } catch (err) {
            console.log(`err`, err);
        }
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
