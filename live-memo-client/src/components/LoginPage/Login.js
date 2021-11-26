import { Button } from '@mui/material'
import React from 'react'
import "./Login.css"
import { login } from "../../features/userSlice"
import { useDispatch } from "react-redux"
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { IconButton } from '@mui/material';
// import axios from 'axios';
import { api } from "../../axios";
import { Cookies } from "react-cookie";
import { baseUrl } from "../../axios";

function Login() {
    const cookies = new Cookies();
    const token = cookies.get('livememo-token');



    const signIn = async (dispatch) => {
        try {
            // window.location.href = 'https://livememo-backend.herokuapp.com/api/user/auth/google';
            window.location.href = `${baseUrl}api/user/auth/google`;
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
